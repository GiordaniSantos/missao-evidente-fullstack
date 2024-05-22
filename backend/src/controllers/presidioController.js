const express = require('express');
const { Presidio } = require('../models');
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
    const presidios = await Presidio.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await Presidio.count({ where: whereCondition });

    const linksPagination = pagination('presidio', currentPage, count, perPage);
    const links = paginationInfo('presidio', currentPage, count, perPage);
    
    return res.json({
        data: presidios,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + presidios.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;

    const presidio  = await Presidio.findOne({where: {id:id, userId}});
    if(!presidio) return res.jsonNotFound();
    return res.json(presidio);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const presidio = await Presidio.create({userId});
        return res.jsonOK(presidio);
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

    const presidio  = await Presidio.findOne({where: {id:id, userId}});
    if(!presidio) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'valor inválido' })
        presidio.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        presidio.set('createdAt', isoDate,{raw: true});
    }
    presidio.set('nome', body['nome']);
    
    let validateErrors = await presidio.validate({fields: ['nome']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await presidio.save({
        silent: true,
        fields: ['nome','createdAt']
    });

    return res.jsonOK(presidio);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const presidio  = await Presidio.findOne({where: {id:id, userId}});
    if(!presidio) return res.jsonNotFound();
    await presidio.destroy();
    return res.jsonOK();
});

module.exports = router;