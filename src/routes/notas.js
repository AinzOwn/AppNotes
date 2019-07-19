const router = require('express').Router();

const Nota = require('../models/Nota');
const { isAuthenticated } = require('../helpers/autenticacion');

router.get('/notas/agregar', isAuthenticated, (req, res) =>{
    res.render('notas/agregar-notas');
});

router.post('/notas/agregar-notas', isAuthenticated, async (req, res) =>{
    const { titulo, descripcion} = req.body;
    const errorMsg = [];
    if (!titulo) {
        errorMsg.push({text: 'Por favor agragar un titulo'});
    }
    if (!descripcion) {
        errorMsg.push({text: 'Agrega una descripcion'});
    }
    if (errorMsg.length > 0) {
        res.render('notas/agregar-notas', {
            errorMsg,
            titulo,
            descripcion
        });
    }else{
        const nuevaNota = new Nota({titulo, descripcion});
        nuevaNota.usuario = req.user.id;//sdfdsf
        await nuevaNota.save();
        req.flash('perfecto_msg', 'La Nota se Agrego Satisfactoriamente');
        res.redirect('/notas');
    }
});

router.get('/notas', isAuthenticated, async (req, res) =>{
    const notas = await Nota.find({usuario: req.user.id}).sort({ fecha: 'desc'});//{user: req.user.id}
    res.render('notas/notas', {notas});
});

router.get('/notas/edit/:id', isAuthenticated, async (req, res) =>{
    const nota = await Nota.findById(req.params.id);
    res.render('notas/editar-nota', {nota});
});

router.put('/notas/editar-nota/:id', isAuthenticated, async (req, res) =>{
    const { titulo, descripcion } = req.body;
    await Nota.findByIdAndUpdate(req.params.id, { titulo, descripcion});
    req.flash('perfecto_msg', 'Nota Actualizada Satisfactoriamente');
    res.redirect('/notas');
});

router.delete('/notas/eliminar/:id', isAuthenticated, async (req, res) =>{
    await Nota.findByIdAndRemove(req.params.id);
    req.flash('perfecto_msg', 'Nota Eliminada Satisfactoriamente');
    res.redirect('/notas');
});

module.exports = router;