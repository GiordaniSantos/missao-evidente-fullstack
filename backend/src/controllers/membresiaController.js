const express = require('express');
const { Membresia } = require('../models');
const { Op } = require('sequelize');
const { pagination, paginationInfo } = require('../helpers/pagination');
const { formatDate, isIso, checkIsDate } = require('../helpers/date')

const router = express.Router();

router.get('/', async (req, res) =>{
    const perPage = Math.max(0, parseInt(req.query.per_page || '10', 10));
    const currentPage = Math.max(0, parseInt(req.query.page || '1', 10));
    const search = req.query.search || '';
    const sortField = req.query.sort_field || 'createdAt';
    const sortDirection = req.query.sort_direction || 'DESC';
    const offset = (currentPage - 1) * perPage;
    const userId = req.query.userId;

    const whereCondition = {};
    if (userId) {
        whereCondition.userId = userId;
        whereCondition.tipo = 'Frequência';
    }
    if (search) {
        whereCondition[Op.and] = [
            {
              nome: {
                [Op.like]: `%${search}%`
              }
            },
            /*{
                createdAt: {
                    [Op.eq]: search consulta por data especifica
                },
                ou consulta data incicio e data fim
                {
                createdAt: {
                    [Op.gte]: startDate.toISOString(),
                    [Op.lte]: endDate.toISOString()
                }
                }
            }*/
          ];
    }
    const membresias = await Membresia.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await Membresia.count({ where: whereCondition });

    const linksPagination = pagination('membresia', currentPage, count, perPage);
    const links = paginationInfo('membresia', currentPage, count, perPage);
    
    return res.json({
        data: membresias,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + membresias.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;
    const tipo = req.query.tipo;

    const membresia  = await Membresia.findOne({where: {id:id, userId, tipo}});
    if(!membresia) return res.jsonNotFound();
    return res.json(membresia);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const {nome, quantidade} = req.body;
        let tipo = "Frequência"
        if(req.body.tipo){
            tipo = req.body.tipo
            console.log(tipo)
        }
        const membresia = await Membresia.create({nome, quantidade, tipo, userId});
        return res.jsonOK(membresia);
    } catch (err) {
        let validateErrors = err.errors;
        if(validateErrors.length > 0) {
            let field =  validateErrors[0].path
            let message =  validateErrors[0].message
            
            return res.status(422).json({ field,message })
        }
        return res.status(500).json({ message: 'Erro ao criar o registro.' });
    }
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const { body } = req;

    const membresia  = await Membresia.findOne({where: {id:id, userId}});
    if(!membresia) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'Valor de Data Inválido' })
        membresia.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        membresia.set('createdAt', isoDate,{raw: true});
    }
    if(body['tipo']){
        membresia.set('tipo', body['tipo']);
    }
    membresia.set('nome', body['nome']);
    membresia.set('quantidade', body['quantidade']);
    
    let validateErrors = await membresia.validate({fields: ['nome', 'quantidade']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await membresia.save({
        silent: true,
        fields: ['nome', 'quantidade', 'tipo', 'createdAt']
    });

    return res.jsonOK(membresia);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const membresia  = await Membresia.findOne({where: {id:id, userId}});
    if(!membresia) return res.jsonNotFound();
    await membresia.destroy();
    return res.jsonOK();
});

module.exports = router;