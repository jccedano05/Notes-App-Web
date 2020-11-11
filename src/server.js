//AQUI HACEMOS FUNCIONAR NUESTRO SERVIDOR

//----- IMPORTACIONES -------
const express = require('express'); //para inicializar el servgidor importamos express (que es el framework para esto)
const path = require('path');  //para usar path.join este modulo viene por defecto
const exphbs = require('express-handlebars');  //es el motor de plantilla que usaremos
const { extname } = require('path');
const morgan = require('morgan');   //este nos permite ver 
const methodOverride = require('method-override');  //este nos ayudara a poder hacer la funcion delete, funciona como un middleware
const flash = require('connect-flash');
const session =require('express-session');
const passport = require('passport');


// -------- INITIALIZATIONS -----------
const app = express(); //para inicializar debemos utilizar la funcion express que activa el framework

require('./config/passport');



 


// --------- SETTINGS -----------
//es lo que yo quiero que haga express basado a unos modulos

app.set('port', process.env.PORT || 4000);  //configuramos nuesto puerto por donde tengamos el servidor. process.env.PORT hace referencia a una variable de entorno, quiere decir que si nuestro computador tiene una variable llamada port que la utilice, si no que utilice el puerto 4000

app.set('views', path.join(__dirname , 'views') ); //tenemos que decirle donde se encuentra la carpeta views, le damos la direccion con __dirname que nos ubica desde la raiz (sea linux, windows, mac) y nos lleva hasta la carpeta src que se encuentra server.js quien llama la funcion y path.join concatena la ruta ya que usar / podria funcionar para un sistema operativo mas otros no. view nos sirve para renderizar una vista
  
app.engine('.hbs',exphbs({  //con engine configuramos el motor de plantilla  .hbs es el nombre que le daremos
       
        defaultLayout: 'main.hbs',  //decimos que usaremos este archivo por defecto
    
        //es un metodo donde tendremos un codigo en comun como navegacion o footers
        // partials toma partes del codigo html para insertarlo en otros lados
        layoutsDir: path.join(app.get('views'),'layouts'),  //donde estaran los layouts
        partialsDir: path.join(app.get('views'),'partials'),  //donde estaran los partials

        extname: '.hbs' //el nombre de la extension que usaremos terminara en hbs por lo que ya no necesitamos colocar la extension al referirse a ese archivo
}));

app.set('view engine', '.hbs');   //le decimos que el motod de la plantilla que usaremos es engine







// --------- MIDDLEWARES -----------
//funciones que se van ejecutando a medida que nos llegan las peticiones ya sea Json u otro

app.use(morgan('dev'));  //esto nos ayuda a saber si la peticion al servidor fallo, entro y demas


app.use(express.urlencoded({extended: false})); //cada vez que llegan datos de un formulario a traves de cualquier tipo de metodo, lo convertiremos a Json para poderlo manipular en codigo

app.use(methodOverride('_method'));  //con esto decimos que ademas de enviar al formulario normal podemos enviarle un query cada que invoquemos el formulario 

app.use(session({  //este es quien nos ayudara a guardar los modulos en el servidor
        secret: 'secret',
        resave: true, //valor por defecto
        saveUninitialized: true //valor por defecto
}));

app.use(passport.initialize());  //estos 2 necesita passport para funcionar
app.use(passport.session());

app.use(flash());



// --------- GLOBAL VARIABLES -----------
// hace referencia a las variables  que podemos usar en todo nuestro proyecto
app.use((req, res, next) => { //next es importante para crear nuestro propio middleware pues esto nos ayuda a continuar

        res.locals.success_msg = req.flash('success_msg'); //esto nos ayuda a guardar la variable en todo el proyecto
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;  //ponemos en una variable global lo que tenca passport (user) y si no trae nada ponemos null para que no de error
        next();
});





// --------- STATIC FILES -----------
// aqui se configuran los archivos estaticos de la carpeta public sin pedir autentificacion
app.use(express.static(path.join(__dirname , 'public'))); //le decimos que la carpeta public todo el navegador va a poder tener acceso




// --------- ROUTES -----------
// aqui veremos las rutas
app.use(require('./routes/index.routes'));  //con esto cambiamos quien tendra las peticiones de rutas (osea que la buscara en el archivo index.routes.js)
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));




module.exports = app; //app no se executa en el server  sino en index.js ya que es en donde arrancamos la aplicacion

//por eso lo exportamos