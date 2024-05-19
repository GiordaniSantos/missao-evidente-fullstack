const express = require('express');
const { Crente } = require('../models');
const { Op } = require('sequelize');
const { pagination, paginationInfo } = require('../helpers/pagination');

const router = express.Router();

router.get('/', async (req, res) =>{
    const perPage = Math.max(0, parseInt(req.query.per_page || '10', 10));
    const currentPage = Math.max(0, parseInt(req.query.page || '1', 10));
    const search = req.query.search || '';
    const sortField = req.query.sort_field || 'updatedAt';
    const sortDirection = req.query.sort_direction || 'DESC';
    const offset = (currentPage - 1) * perPage;

    const whereCondition = {};
    if (search) {
        whereCondition[Op.or] = [
            {
            nome: {
                [Op.like]: `%${search}%`
            },
            }
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
    try{
        const userId = req.query.userId;

        const crente = await Crente.create({userId})

        return res.jsonOK(crente);
    }catch(error) {
        return res.status(500).json({ message: 'Erro ao criar visita ao crente' });
    }
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const { body } = req;
    const fields = ['userId', 'nome', 'createdAt'];

    const crente  = await Crente.findOne({where: {id:id, userId}});
    if(!crente) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) crente[fieldName] = newValue
    });

    await crente.save();

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