const express = require('express');
const { Crente } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const crente = await Crente.findAll();
    return res.jsonOK(crente);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const crente  = await Crente.findOne({where: {id:id}});
    if(!crente) return res.jsonNotFound();
    return res.jsonOK(crente);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const crente = await Crente.create({userId})

    return res.jsonOK(crente);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const crente  = await Crente.findOne({where: {id:id}});
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
    const crente  = await Crente.findOne({where: {id:id}});
    if(!crente) return res.jsonNotFound();
    await crente.destroy();
    return res.jsonOK();
});

module.exports = router;