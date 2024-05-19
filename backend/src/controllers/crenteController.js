const express = require('express');
const { Crente } = require('../models');
const { Op } = require('sequelize');
const { pagination, paginationInfo } = require('../helpers/pagination');
const { formatDate, isIso, checkIsDate } = require('../helpers/date')

const router = express.Router();

router.get('/', async (req, res) =>{
    const perPage = Math.max(0, parseInt(req.query.per_page || '10', 10));
    const currentPage = Math.max(0, parseInt(req.query.page || '1', 10));
    const search = req.query.search || '';
    const sortField = req.query.sort_field || 'updatedAt';
    const sortDirection = req.query.sort_direction || 'DESC';
    const offset = (currentPage - 1) * perPage;
    const userId = req.query.userId;

    const whereCondition = {};
    if (userId) {
        whereCondition.userId = userId;
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
    const crentes = await Crente.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await Crente.count({ where: whereCondition });

    const linksPagination = pagination('crente', currentPage, count, perPage);
    const links = paginationInfo('crente', currentPage, count, perPage);
    
    return res.json({
        data: crentes,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + crentes.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;

    const crente  = await Crente.findOne({where: {id:id, userId}});
    if(!crente) return res.jsonNotFound();
    return res.json(crente);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const crente = await Crente.create({userId});
        return res.jsonOK(crente);
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

    const crente  = await Crente.findOne({where: {id:id, userId}});
    if(!crente) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'valor inválido' })
        crente.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        crente.set('createdAt', isoDate,{raw: true});
    }
    crente.set('nome', body['nome']);
    
    let validateErrors = await crente.validate({fields: ['nome']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await crente.save({
        silent: true,
        fields: ['nome','createdAt']
    });

    return res.jsonOK(crente);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const crente  = await Crente.findOne({where: {id:id, userId}});
    if(!crente) return res.jsonNotFound();
    await crente.destroy();
    return res.jsonOK();
});

module.exports = router;