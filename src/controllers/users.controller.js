const userCtrl = {};

const passport = require('passport');

const User = require('../models/User');

userCtrl.renderSingUpForm = (req, res) => {
    res.render('users/signup');
}



userCtrl.signup = async (req, res) => {
   
    const errors = [];  //creamos un array pues podemos tener muchos errores en esta seccion
    const { name ,email ,password ,confirm_password } = req.body;

    if(password != confirm_password){
        errors.push({text: ' Passwords do not match'});
    }
    if(password.length < 8){
        errors.push({text: 'Passwords must be at least 8 characters.'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
           errors,
           name,
           email 

        })
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){ //preguntamos si habia guaredado y si es asi que nos de el error
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/users/signup');
        } else {
           const newUser = new User({name, email, password});
           newUser.password = await newUser.encryptPassword(password);  //mandamos al metodo para encriptar
           await newUser.save();
           delete password;  //borramos las passwords por seguridad 
           delete confirm_password;
           req.flash('success_msg', 'You are Registered!.')
           res.redirect('/users/signin');

        }
    }

}


userCtrl.renderSingInForm = (req, res) => {
    res.render('users/signin');
}





userCtrl.signin = passport.authenticate('local', {  //se basa en lo que hicimos en el local strategy
    failureRedirect: '/users/signin', //si el usuario, contrasena no existe lo redireccionamos
    successRedirect: '/notes',  
    failureFlash: true
})





userCtrl.logout = (req, res) => {
    req.logout();  //passport se encarga de cerrar la sesion
    req.flash('success_msg', 'You are logged out now');
    res.redirect('/users/signin');
}


module.exports = userCtrl;