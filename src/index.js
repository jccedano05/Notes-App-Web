const dotenv = require('dotenv')

dotenv.config(); //config lo que hace es que si al inicio de nuestro proyecto hay un archito llamado .env leera lo quue tiene 
                               //dentro y lo asigna a una variable de entorno 

const app = require('./server');  //llamamos la variable app en index.js para trabajar con ella
require('./database');  //con esto mandamos allamar la base de datos


app.listen(app.get('port'), () => {   //con esto decimos que nuestra app se conecte a donde obtenga el puerto que es en el settings de server.js
    console.log('Server on port 4000');
});