const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next) => {
const token = req.cookies.userID;
    if(token){
        jwt.verify(token, 'almustaphatukurukar1410204031', (error, decodedToken) => {
            if(error){
                console.log(error.message);
                res.redirect('/user/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/user/login');
    }
}
module.exports = { requireAuth }