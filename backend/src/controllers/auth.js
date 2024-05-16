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

    const account = await User.findOne({ where: { email }});
    if ( account ) return res.jsonBadRequest(null, getMessage('user.signup.email_exists'));

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await User.create({ name, email, password: hash });

    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});

    return res.jsonOK(newAccount, getMessage('user.signup.sucess'), { token, refreshToken });
});

router.post('/refresh', async (req, res)=>{
    const token = getTokenFromHeaders(req.headers);
    if(!token) {
        return res.jsonUnauthorized(null, 'Invalid token 1');
    }

    try{
        const decoded = verifyRefreshJwt(token);
        const user = await User.findByPK(decoded.id);
        if(!user) return res.jsonUnauthorized(null, 'Invalid token 2');

        if(decoded.version != user.jwtVersion){
            return res.jsonUnauthorized(null, 'Invalid token 3');
        }

        const meta = {
            token: generateJwt({ id: user.id}),
        };

        return res.jsonOK(null, null, meta);


    }catch(error) {
        return res.jsonUnauthorized(null, 'Invalid token 4');
    }


});

module.exports = router;