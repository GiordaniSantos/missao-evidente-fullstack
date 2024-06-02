const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { getMessage } = require('../helpers/validator');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const user  = await User.findOne({where: {id:id}});
    if(!user) return res.jsonNotFound();
    return res.jsonOK(user);
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;

    const { body } = req;

    const user  = await User.findOne({where: {id:id}});
    if(!user) return res.jsonNotFound();

    const emailExist = await User.findOne({ where: { email: body['email'], id: { [Op.not]: id} }});
    if ( emailExist ) return res.jsonBadRequest(null, getMessage('user.signup.email_exists'));

    if(body['password'] == undefined && body['passwordRepeat'] || body['password'] == "" && body['passwordRepeat']) return res.jsonBadRequest(null, 'Campo de senha deve ser preenchido!');
    if(body['password'] && body['password'] != body['passwordRepeat']) return res.jsonBadRequest(null, 'Campo de confirmação de senha deve ser idêntico ao campo senha!');

    if(body['password']){
        const hash = bcrypt.hashSync(body['password'], 10);
        user.set('password', hash);
    }

    user.set('name', body['name']);
    user.set('email', body['email']);
    
    let validateErrors = await user.validate().catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await user.save();

    return res.jsonOK(user);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const user  = await User.findOne({where: {id:id}});
    if(!user) return res.jsonNotFound();
    await user.destroy();
    return res.jsonOK();
});


 module.exports = router;