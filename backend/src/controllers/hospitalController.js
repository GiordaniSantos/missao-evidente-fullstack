const express = require('express');
const { Hospital } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const hospitais = await Hospital.findAll();
    return res.jsonOK(hospitais);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const hospital  = await Hospital.findOne({where: {id:id}});
    if(!hospital) return res.jsonNotFound();
    return res.jsonOK(hospital);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const hospital = await Hospital.create({userId})

    return res.jsonOK(hospital);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const hospital  = await Hospital.findOne({where: {id:id}});
    if(!hospital) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) hospital[fieldName] = newValue
    });

    await hospital.save();

    return res.jsonOK(hospital);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const hospital  = await Hospital.findOne({where: {id:id}});
    if(!hospital) return res.jsonNotFound();
    await hospital.destroy();
    return res.jsonOK();
});

module.exports = router;