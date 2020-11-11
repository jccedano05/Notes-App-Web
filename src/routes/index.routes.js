// AQUI DEFINIMOS LAS RUTAS QUE NOS LLEGAN DE PETICION Y DSECIMOS QUE QUEREMOS HACER CON ELLAS


const {Router} = require('express');

const router = Router(); // lo ejecutamos y lo guardamos con esto definimos una especie de url

const { renderIndex, renderAbout} = require('../controllers/index.controller'); //llamamos las funciones que tenemos en el objeto index.controller para usarlos como funciones de rutas

router.get('/', renderIndex );  //esta manera llamamos a la funcion renderIndex que esta contenida en index.controller y ella le dira que es lo que tiene que hacer al obtener ese request ('/')

router.get('/about', renderAbout);

module.exports = router;