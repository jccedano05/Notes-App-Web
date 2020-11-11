const helpers = {};


//Creamos un Middleware
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){  //usamos la funcion de passport para ver si ya se autentifico  
       
       
        return next();   //next significa que si se cumple la condicional, siga con el codigo normalmente.
    }
    req.flash('error_msg', 'Not Authorized')
    res.redirect('/users/signin');
}

module.exports = helpers;