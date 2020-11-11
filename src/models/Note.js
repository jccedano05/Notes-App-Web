const {Schema, model} = require('mongoose');  //{} para solo las clases que usaremos en lugar de todo
// Schema: que es llo que voy a guardar dentro de MongoDb
//model: apartir de schema te permite crear clase con metodos y propiedades

const NoteSchema = new Schema({   
    title:{
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { 
        timestamps: true //declaramos que nos cree automaticamente CreateAt UpdateAt que son cuando se creo y modifico 
    
});

module.exports = model('Note', NoteSchema);  //este es el modelo que usaremos en todas partes 