const express = require('express');
const { Presidio } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const presidios = await Presidio.findAll();
    return res.jsonOK(presidios);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const presidio  = await Presidio.findOne({where: {id:id}});
    if(!presidio) return res.jsonNotFound();
    return res.jsonOK(presidio);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const presidio = await Presidio.create({userId})

    return res.jsonOK(presidio);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const presidio  = await Presidio.findOne({where: {id:id}});
    if(!presidio) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) presidio[fieldName] = newValue
    });

    await presidio.save();

    return res.jsonOK(presidio);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const presidio  = await Presidio.findOne({where: {id:id}});
    if(!presidio) return res.jsonNotFound();
    await presidio.destroy();
    return res.jsonOK();
});

module.exports = router;