const express = require('express');
const { Crente } = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req, res) =>{
    const perPage = req.query.per_page || 10;
    const search = req.query.search || '';
    const sortField = req.query.sort_field || 'updatedAt';
    const sortDirection = req.query.sort_direction || 'DESC';

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
        offset: req.query.page ? req.query.page * perPage : 0
    });

    const count = await Crente.count({ where: whereCondition });

    return res.json({
        data: crentes,
        meta: {
          total: count,
          per_page: perPage,
          current_page: req.query.page || 0,
          last_page: Math.ceil(count / perPage) - 1,
          next_page: parseInt(req.query.page) + 1 || null,
          prev_page: parseInt(req.query.page) - 1 || null
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
    const fields = ['userId', 'nome', 'created_at'];

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