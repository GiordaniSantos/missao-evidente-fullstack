const express = require('express');
const { Enfermo } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const enfermos = await Enfermo.findAll();
    return res.jsonOK(enfermos);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const enfermo  = await Enfermo.findOne({where: {id:id}});
    if(!enfermo) return res.jsonNotFound();
    return res.jsonOK(enfermo);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const enfermo = await Enfermo.create({userId})

    return res.jsonOK(enfermo);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const enfermo  = await Enfermo.findOne({where: {id:id}});
    if(!enfermo) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) enfermo[fieldName] = newValue
    });

    await enfermo.save();

    return res.jsonOK(enfermo);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const enfermo  = await Enfermo.findOne({where: {id:id}});
    if(!enfermo) return res.jsonNotFound();
    await enfermo.destroy();
    return res.jsonOK();
});

module.exports = router;