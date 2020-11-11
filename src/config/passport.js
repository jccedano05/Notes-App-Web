const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');


passport.use(new LocalStrategy({  //de esta manera recibimos los datos
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {  //ejecutamos una funcion que toma los datos y ahi adentro validamos, comparamos cifrado y consultamos la BD.. aparte de los parametros necesitamos un callback (done)

    //MATCH EMAIL'S USER
    const user = await User.findOne({email});
    if(!user){
        return done(null, false, {message: 'Not User Found'}); //done es un callback que nos retorna en una funcion, nos pide primer parametro un error, desp un usuario y despues lo que sea
    } else {
        // MATCH PASSWORD'S USER
        const match =  await user.matchPassword(password);

        if(match){
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect Password'});
        }
    }
}));

passport.serializeUser((user, done) => {  //lo guardamos en la sesion del servidor, esta funcion recibe un usuario y un callback
    done(null, user.id); //por id
});  

passport.deserializeUser((id, done) => {  //passport hace una consulta en la base de datos si ese Id tiene autorizacion y obtiene los datos del usuario
    User.findById(id, (err, user) => {
        done(err, user);
    })
});