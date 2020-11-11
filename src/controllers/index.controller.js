// AQUI GUARDAMOS LAS FUNCIONES QUE USAMOS CUANDO NOS LLEGAN LOS REQUEST, RESPONSE Y LOS EXPORTAREMOS AL ARCHIVO index.routes.js  

const indexCtrl = {};  //creamos un objeto

indexCtrl.renderIndex = (req,res)=> {  //creamos la funcion renderIndex
    res.render('index.hbs')  //con esto renderizamos index
}

indexCtrl.renderAbout = (req,res)=> {  
    res.render('about')  //no es necesario poner .hbs pues en server dijimos que los omitiera y supiera que es (extname: '.hbs')
}

module.exports = indexCtrl;  //exportamos todo el objeto con sus funciones