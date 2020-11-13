const mongoose = require('mongoose');
 

const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env; 


const MONGODB_URI = `mongodb+srv://${NOTES_APP_MONGODB_HOST}@cluster0.a1e2k.mongodb.net/${NOTES_APP_MONGODB_DATABASE}`; 


mongoose.connect(MONGODB_URI,{  
    useUnifiedTopology: true, //esto es requerido para hacer la conexion
    useNewUrlParser: true,     //esto es requerido para hacer la conexion
    useCreateIndex: true    //esto es requerido para hacer la conexion
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err));