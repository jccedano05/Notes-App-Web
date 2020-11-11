const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
    name: { type:String, required: true},
    email: { type:String, required: true, unique:true},
    password: { type:String, required: true}
}, {
    timestamps: true
});


//METODO PARA CIFRAR PASSWORD
UserSchema.methods.encryptPassword = async password => {   //.methods nos ayuda a crear un metodo para UserSchema en este caso se llama encryoPassword y usaremos el campo password

     const salt = await bcrypt.genSalt(10);  //genera el salt que es un string que se basara para el cifrado (10 es el tamano del string) 10 es el valor tipico y es un metodo asincrono
    return await bcrypt.hash(password,salt);  //esto nos devuelve la contrasena pero ya cifrada //es un metodo asincrono
};


//METODO PARA COMPARA CIFRADOS DE PASSWORD
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)   //password es la que el usuario nos pasa, this.password es la que tenemos guardada en UserSchema ambas cifradas
}

module.exports = model('User', UserSchema);