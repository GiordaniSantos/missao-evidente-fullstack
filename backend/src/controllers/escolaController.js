const express = require('express');
const { Escola } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const escolas = await Escola.findAll();
    return res.jsonOK(escolas);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const escola  = await Escola.findOne({where: {id:id}});
    if(!escola) return res.jsonNotFound();
    return res.jsonOK(escola);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const escola = await Escola.create({userId})

    return res.jsonOK(escola);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const escola  = await Escola.findOne({where: {id:id}});
    if(!escola) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) escola[fieldName] = newValue
    });

    await escola.save();

    return res.jsonOK(escola);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const escola  = await Escola.findOne({where: {id:id}});
    if(!escola) return res.jsonNotFound();
    await escola.destroy();
    return res.jsonOK();
});

module.exports = router;