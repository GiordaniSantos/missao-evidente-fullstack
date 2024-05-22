const express = require('express');
const { Hospital } = require('../models');
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
    const hospitals = await Hospital.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await Hospital.count({ where: whereCondition });

    const linksPagination = pagination('hospital', currentPage, count, perPage);
    const links = paginationInfo('hospital', currentPage, count, perPage);
    
    return res.json({
        data: hospitals,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + hospitals.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;

    const hospital  = await Hospital.findOne({where: {id:id, userId}});
    if(!hospital) return res.jsonNotFound();
    return res.json(hospital);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const hospital = await Hospital.create({userId});
        return res.jsonOK(hospital);
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

    const hospital  = await Hospital.findOne({where: {id:id, userId}});
    if(!hospital) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'valor inválido' })
        hospital.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        hospital.set('createdAt', isoDate,{raw: true});
    }
    hospital.set('nome', body['nome']);
    
    let validateErrors = await hospital.validate({fields: ['nome']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await hospital.save({
        silent: true,
        fields: ['nome','createdAt']
    });

    return res.jsonOK(hospital);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const hospital  = await Hospital.findOne({where: {id:id, userId}});
    if(!hospital) return res.jsonNotFound();
    await hospital.destroy();
    return res.jsonOK();
});

module.exports = router;