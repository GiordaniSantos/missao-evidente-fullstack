const express = require('express');
const { Membresia, Crente, Incredulo, Presidio, Enfermo, Hospital, Escola, BatismoInfantil, BatismoProfissao, BencaoNupcial, SantaCeia, Estudo, Sermao, EstudoBiblico, Discipulado } = require('../models');
const { Sequelize, Op } = require('sequelize');
const { pagination, paginationInfo } = require('../helpers/pagination');
const { formatDate, isIso, checkIsDate } = require('../helpers/date')

const router = express.Router();

router.get('/', async (req, res) =>{
    try {
        const userId = req.query.userId;
        const mes = req.query.mes || new Date().getMonth() + 1;
        const ano = req.query.ano || new Date().getFullYear();

        const commomQuery = {
            where: {
                userId,
                createdAt: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('YEAR', Sequelize.col('createdAt')),
                            ano
                        ),
                        Sequelize.where(
                            Sequelize.fn('MONTH', Sequelize.col('createdAt')),
                            mes
                        ),
                    ],
                },
            },
        }
    
        const membresias = await Membresia.findAll({
            where: {
              userId,
              createdAt: {
                [Op.and]: [
                  Sequelize.where(
                    Sequelize.fn('YEAR', Sequelize.col('createdAt')),
                    ano
                  ),
                  Sequelize.where(
                    Sequelize.fn('MONTH', Sequelize.col('createdAt')),
                    mes
                  ),
                ],
              },
            },
            order: [['createdAt', 'ASC']],
        });

        const crentes = await Crente.count(commomQuery);

        const incredulos = await Incredulo.count(commomQuery);

        const presidios = await Presidio.count(commomQuery);

        const enfermos = await Enfermo.count(commomQuery);

        const hospitais = await Hospital.count(commomQuery);

        const escolas = await Escola.count(commomQuery);

        const batismoInfantil = await BatismoInfantil.count(commomQuery);

        const batismoProfissao = await BatismoProfissao.count(commomQuery);

        const bencaoNupcial = await BencaoNupcial.count(commomQuery);

        const santaCeia = await SantaCeia.count(commomQuery);

        const estudo = await Estudo.count(commomQuery);

        const sermao = await Sermao.count(commomQuery);

        const estudoBiblico = await EstudoBiblico.count(commomQuery);

        const discipulado = await Discipulado.count(commomQuery);
    
        /*const comungante = await Comungante.findOne({
          where: { userId },
          attributes: ['quantidade'],
        });
        const naoComungante = await NaoComungante.findOne({
          where: { userId },
          attributes: ['quantidade'],
        });
        */

        res.status(200).json({
          membresias: membresias,
          crentes,
          incredulos,
          presidios,
          enfermos,
          hospitais,
          escolas,
          batismoInfantil,
          batismoProfissao,
          bencaoNupcial,
          santaCeia,
          estudo,
          sermao,
          estudoBiblico,
          discipulado
          //comungante: comungante ? comungante.dataValues.quantidade : 0,
          //naoComungante: naoComungante ? naoComungante.dataValues.quantidade : 0,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;