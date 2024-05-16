const express = require('express');
const { Incredulo } = require('../models');

const router = express.Router();

router.get('/', async (req, res) =>{
    const incredulos = await Incredulo.findAll();
    return res.jsonOK(incredulos);
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const incredulo  = await Incredulo.findOne({where: {id:id}});
    if(!incredulo) return res.jsonNotFound();
    return res.jsonOK(incredulo);
});

router.post('/', async(req, res) =>{
    const {userId} = req.body;

    const incredulo = await Incredulo.create({userId})

    return res.jsonOK(incredulo);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;
    const fields = ['userId', 'nome', 'created_at'];

    const incredulo  = await Incredulo.findOne({where: {id:id}});
    if(!incredulo) return res.jsonNotFound();
    
    fields.map(fieldName=>{
        const newValue = body[fieldName];
        if(newValue!=undefined) incredulo[fieldName] = newValue
    });

    await incredulo.save();

    return res.jsonOK(incredulo);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const incredulo  = await Incredulo.findOne({where: {id:id}});
    if(!incredulo) return res.jsonNotFound();
    await incredulo.destroy();
    return res.jsonOK();
});

module.exports = router;