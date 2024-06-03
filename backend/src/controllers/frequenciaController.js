const express = require('express');
const { Membresia } = require('../models');

const router = express.Router();

router.get('/', async (req, res)=>{
    const userId = req.query.userId;
    const tipo = req.query.tipo;

    const membresia  = await Membresia.findOne({
        where: {userId, tipo},
        order: [['createdAt', 'DESC']]
    });
    if(!membresia) return res.jsonNotFound();
    return res.json(membresia);
});

module.exports = router;