const notesCtrl = {};

const Note = require('../models/Note'); // Agregamos el modelo de MongoDb



notesCtrl.renderNoteForm = (req, res) => {  //con esta funcion renderizamos una nueva nota
    res.render('notes/new-note'); //redireccionamos a new-note y este lo renderizara (el archivo.hbs)
};




notesCtrl.createNewNote = async (req, res) => {  
    //al enviar el post, automaticamente creamos un objeto con los valores de los campos, por lo que para obtenerlos solo tenemos que destructurarlo y guardar sus valores en la BD
    const {title, description} = req.body; //extraer valores de un objetos

    const newNote = new Note({title, description})  //al llamarse la variable del objeto igual que la variable que destructuramos, no necesitamos ponerlo asi title:title, automaticamente sabe que se llama igual
   
    newNote.user = req.user.id;  //le asignamos a la nueva nota el id del usuario para autentificacion

    //es una operacion asincrona el save()
    await newNote.save(); //de esta manera Mongoose lo guarda por nosotros en la base de datos, donde nosotros le habiamos dicho previamente que lo hiciera (que lo definimos en models/'Note)



    req.flash('success_msg', 'Note Added Successfully');

    res.redirect('/notes')

};




notesCtrl.renderNotes = async (req, res) => { 
  const notes = await Note.find({user: req.user.id});  //buscamos todas las notas donde el usuario sea igual al id de la sesion
  res.render('notes/all-notes', {notes}); // {notes} de esta manera podemos pasarle los valores dentro de las variables que estan en llaves, a la pagina que escribimos para render (all-notes)
}





notesCtrl.renderEditForm = async (req, res) => {  
    const note = await Note.findById(req.params.id)
    if(note.user != req.user.id){   //con esta validacion vemos si el usuario quiere acceder a editar una nota que no le corresponda
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', {note});
}


notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});

    req.flash('success_msg', 'Note Updated Successfully');

    res.redirect('/notes');
}




notesCtrl.deleteNote = async (req, res) => {
 
    const note = await Note.findById(req.params.id)
    if(note.user != req.user.id){  
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successfully');

    res.redirect('/notes');
}

module.exports = notesCtrl;
