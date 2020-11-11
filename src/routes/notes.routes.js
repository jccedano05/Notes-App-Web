const{Router} = require('express');
const router = Router();

const { renderNoteForm, 
        createNewNote, 
        renderNotes, 
        renderEditForm, 
        updateNote, 
        deleteNote} = require('../controllers/notes.controller');


const {isAuthenticated} = require('../helpers/auth')

// -------- Nueva Nota ---------
router.get('/notes/add', isAuthenticated ,renderNoteForm); //con esta ruta mostraremos un formulario para que aguregue tarea o nota

router.post('/notes/new-note', isAuthenticated, createNewNote); //esta ruta al ser la misma de la de arriba funciona diferente pues el metodo es post  (esta creara la nota) este solo podemos acceder a el por medio de un formulario o por javascript



// -------- Obtener Todas Las Notas ---------

router.get('/notes', isAuthenticated, renderNotes);


// -------- Modificar Notas  ---------
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);    //para poner un id o dato que variara, se coloca : y el nombre que recibira esa variable (en este caso id)

router.put('/notes/edit/:id', isAuthenticated, updateNote);   // el put actualiza algo que ya existe (post es para un nuevo dato)




// -------- Eliminar Notas ---------
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);    //con este metodo borramos lo que haya en esa ruta


module.exports = router;