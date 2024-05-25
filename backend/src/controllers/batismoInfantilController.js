const express = require('express');
const { BatismoInfantil } = require('../models');
const { Op } = require('sequelize');
const { pagination, paginationInfo } = require('../helpers/pagination');
const { formatDate, isIso, checkIsDate } = require('../helpers/date')

const router = express.Router();

router.get('/', async (req, res) =>{
    const perPage = Math.max(0, parseInt(req.query.per_page || '10', 10));
    const currentPage = Math.max(0, parseInt(req.query.page || '1', 10));
    const search = req.query.search || '';
    const sortField = req.query.sort_field || 'createdAt';
    const sortDirection = req.query.sort_direction || 'DESC';
    const offset = (currentPage - 1) * perPage;
    const userId = req.query.userId;

    const whereCondition = {};
    if (userId) {
        whereCondition.userId = userId;
    }
    if (search) {
        whereCondition[Op.and] = [
            {
              nome: {
                [Op.like]: `%${search}%`
              }
            },
            /*{
                createdAt: {
                    [Op.eq]: search consulta por data especifica
                },
                ou consulta data incicio e data fim
                {
                createdAt: {
                    [Op.gte]: startDate.toISOString(),
                    [Op.lte]: endDate.toISOString()
                }
                }
            }*/
          ];
    }
    const batismosInfantis = await BatismoInfantil.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await BatismoInfantil.count({ where: whereCondition });

    const linksPagination = pagination('batismo-infantil', currentPage, count, perPage);
    const links = paginationInfo('batismo-infantil', currentPage, count, perPage);
    
    return res.json({
        data: batismosInfantis,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + batismosInfantis.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;

    const batismoInfantil  = await BatismoInfantil.findOne({where: {id:id, userId}});
    if(!batismoInfantil) return res.jsonNotFound();
    return res.json(batismoInfantil);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const batismoInfantil = await BatismoInfantil.create({userId});
        return res.jsonOK(batismoInfantil);
    } catch (err) {
        let validateErrors = err.errors;
        if(validateErrors.length > 0) {
            let field =  validateErrors[0].path
            let message =  validateErrors[0].message
            
            return res.status(422).json({ field,message })
        }
        return res.status(500).json({ message: 'Erro ao criar o registro.' });
    }
});

router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const { body } = req;

    const batismoInfantil  = await BatismoInfantil.findOne({where: {id:id, userId}});
    if(!batismoInfantil) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'valor inválido' })
        batismoInfantil.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        batismoInfantil.set('createdAt', isoDate,{raw: true});
    }
    batismoInfantil.set('nome', body['nome']);
    
    let validateErrors = await batismoInfantil.validate({fields: ['nome']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await batismoInfantil.save({
        silent: true,
        fields: ['nome','createdAt']
    });

    return res.jsonOK(batismoInfantil);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const batismoInfantil  = await BatismoInfantil.findOne({where: {id:id, userId}});
    if(!batismoInfantil) return res.jsonNotFound();
    await batismoInfantil.destroy();
    return res.jsonOK();
});

module.exports = router;