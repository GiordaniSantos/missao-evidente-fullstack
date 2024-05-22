const express = require('express');
const { Incredulo } = require('../models');
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
    const incredulos = await Incredulo.findAll({
        where: whereCondition,
        order: [[sortField, sortDirection]],
        limit: perPage,
        offset: offset
    });

    const count = await Incredulo.count({ where: whereCondition });

    const linksPagination = pagination('incredulo', currentPage, count, perPage);
    const links = paginationInfo('incredulo', currentPage, count, perPage);
    
    return res.json({
        data: incredulos,
        links,
        meta: {
            current_page: currentPage,
            from: offset + 1,
            links: linksPagination,
            last_page: Math.ceil(count / perPage),
            per_page: perPage,
            to: offset + incredulos.length,
            total: count
        }
    });
});

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const userId = req.query.userId;

    const incredulo  = await Incredulo.findOne({where: {id:id, userId}});
    if(!incredulo) return res.jsonNotFound();
    return res.json(incredulo);
});

router.post('/', async(req, res) =>{
    const userId = req.query.userId;

    try {
        const incredulo = await Incredulo.create({userId});
        return res.jsonOK(incredulo);
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

    const incredulo  = await Incredulo.findOne({where: {id:id, userId}});
    if(!incredulo) return res.jsonNotFound();
    if(body['createdAt'] && !isIso(body['createdAt'])){
        if(!checkIsDate(body['createdAt'])) return res.status(422).json({ field: 'createdAt',message: 'valor inválido' })
        incredulo.changed('createdAt', true);
        const isoDate = formatDate(body['createdAt']);
        incredulo.set('createdAt', isoDate,{raw: true});
    }
    incredulo.set('nome', body['nome']);
    
    let validateErrors = await incredulo.validate({fields: ['nome']}).catch(err => err.errors);

    if(validateErrors.length > 0) {
        let field =  validateErrors[0].path
        let message =  validateErrors[0].message
        
        return res.status(422).json({ field,message })
    }

    await incredulo.save({
        silent: true,
        fields: ['nome','createdAt']
    });

    return res.jsonOK(incredulo);
});

router.delete('/:id', async (req, res) =>{
    const { id } = req.params;
    const userId = req.query.userId;

    const incredulo  = await Incredulo.findOne({where: {id:id, userId}});
    if(!incredulo) return res.jsonNotFound();
    await incredulo.destroy();
    return res.jsonOK();
});

module.exports = router;