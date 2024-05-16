const { verifyJwt, getTokenFromHeaders } = require('../helpers/jwt');

const checkJwt = (req, res, next) => {

    const { url: path } = req;

    const excludedPaths = ['/auth/cadastrar', '/auth/login', '/auth/refresh'];
    const isExcluded = !!excludedPaths.find(p=> p.startsWith(path));
    if(isExcluded) return next();


    let token = getTokenFromHeaders(req.headers);
    if(!token) {
        return res.jsonUnauthorized(null, 'Invalid token');
    }

    try{

        //console.log('token', token)
        const decoded = verifyJwt(token);
        req.userId = decoded.id;
        

        next();
        
    }catch(error) {
        return res.jsonUnauthorized(null, 'Invalid token');
    }



};

module.exports = checkJwt;