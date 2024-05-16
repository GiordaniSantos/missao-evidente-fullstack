const express = require('express');
const cors = require('cors');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const authController = require('./controllers/auth');
const crenteController = require('./controllers/crenteController');
const increduloController = require('./controllers/increduloController');

const app = express();


app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// /auth/sign-in
// /auth/sign-up
app.use('/api/auth', authController);
app.use('/api/crente', crenteController);
app.use('/api/incredulo', increduloController)

app.get('/', (req, res)=>{
    return res.json('Api running...');
});

db.sequelize.sync().then(() =>{
    app.listen(3002, () => {
        console.log('listening on port 3002');
    });
});