const express = require('express');
const cors = require('cors');
const db = require('./models');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');

const authController = require('./controllers/auth');
const crenteController = require('./controllers/crenteController');
const increduloController = require('./controllers/increduloController');
const enfermoController = require('./controllers/enfermoController');
const presidioController = require('./controllers/presidioController');
const hospitalController = require('./controllers/hospitalController');
const escolaController = require('./controllers/escolaController');
const estudoController = require('./controllers/estudoController');
const sermaoController = require('./controllers/sermaoController');
const estudoBiblicoController = require('./controllers/estudoBiblicoController');
const discipuladoController = require('./controllers/discipuladoController');
const batismoInfantil = require('./controllers/batismoInfantilController');
const batismoProfissao = require('./controllers/batismoProfissaoController');
const bencaoNupcial = require('./controllers/bencaoNupcialController');
const membresiaController = require('./controllers/membresiaController');

const app = express();

app.use(cors());

app.use(response);
app.use(checkJwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// /auth/sign-in
// /auth/sign-up
app.use('/api/auth', authController);
app.use('/api/crente', crenteController);
app.use('/api/incredulo', increduloController)
app.use('/api/enfermo', enfermoController)
app.use('/api/presidio', presidioController)
app.use('/api/hospital', hospitalController)
app.use('/api/escola', escolaController)
app.use('/api/estudo', estudoController)
app.use('/api/sermao', sermaoController)
app.use('/api/estudo-biblico', estudoBiblicoController)
app.use('/api/discipulado', discipuladoController)
app.use('/api/batismo-infantil', batismoInfantil)
app.use('/api/batismo-profissao', batismoProfissao)
app.use('/api/bencao-nupcial', bencaoNupcial)
app.use('/api/membresia', membresiaController)

app.get('/', (req, res)=>{
    return res.json('Api running...');
});

db.sequelize.sync().then(() =>{
    app.listen(3002, () => {
        console.log('listening on port 3002');
    });
});