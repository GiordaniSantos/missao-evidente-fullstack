const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { userSignUp, userSignIn } = require('../validators/User');
const { getMessage } = require('../helpers/validator');
const { generateJwt, generateRefreshJwt, verifyRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');  

const router = express.Router();

const saltRounds = 10;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const account = await User.findOne({ where: { email }});
    
    //validando senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return res.jsonBadRequest(null, getMessage('user.signin.invalid'));

    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion});

    return res.jsonOK(account,  getMessage('user.signin.sucess'), {token, refreshToken});
});

router.post('/cadastrar', async (req, res) => {

    const { name, email, password } = req.body;

    const user = new User({ name, email, password });

    try {
        await user.validate();
    } catch (err) {
        const errors = err.errors;
        const field = errors[0].path;
        const message = errors[0].message;
        return res.status(422).json({ field, message });
    }

    const account = await User.findOne({ where: { email }});
    if ( account ) return res.jsonBadRequest(null, getMessage('user.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await User.create({ name, email, password: hash });

    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

    return res.jsonOK(newAccount, getMessage('user.signup.sucess'), { token, refreshToken });
});

router.post('/logout', async (req, res) => {
    return res.jsonOK();
});

router.post('/refresh', async (req, res)=>{
    //const token = getTokenFromHeaders(req.headers);
    const { token } = req.body;
    
    if(!token) {
        return res.jsonBadRequest(null, 'Necessário refresh token');
    }

    try{
        const decoded = verifyRefreshJwt(token);
        const user = await User.findByPk(decoded.id);
        if(!user) return res.jsonBadRequest(null, 'Invalid token 2');

        if(decoded.version != user.jwtVersion){
            return res.jsonBadRequest(null, 'Invalid token 3');
        }
        
        //invalidando refresh token anterior
        user.jwtVersion++;

        const meta = {
            token: generateJwt({ id: user.id}),
            refreshToken: generateRefreshJwt({id: user.id, version: user.jwtVersion})
        };

        await user.save();

        return res.jsonOK(null, null, meta);

    }catch(error) {
        return res.jsonBadRequest(null, 'Invalid token 4');
    }


});

module.exports = router;