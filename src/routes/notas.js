const router = require('express').Router();

const Nota = require('../models/Nota');

router.get('/notas/agregar', (req, res) =>{
    res.render('notas/agregar-notas');
});

router.post('/notas/agregar-notas', async (req, res) =>{
    const { titulo, descripcion} = req.body;
    const error = [];
    if (!titulo) {
        error.push({text: 'Por favor agragar un titulo'});
    }
    if (!descripcion) {
        error.push({text: 'Agrega una descripcion'});
    }
    if (error.length > 0) {
        res.render('notas/agregar-notas', {
            error,
            titulo,
            descripcion
        });
    }else{
        const nuevaNota = new Nota({titulo, descripcion});
        await nuevaNota.save();
        req.flash('perfecto_msg', 'La Nota se Agrego Satisfactoriamente');
        res.redirect('/notas');
    }
});

router.get('/notas', async (req, res) =>{
    const notas = await Nota.find().sort({ fecha: 'desc'});
    res.render('notas/notas', {notas});
});

router.get('/notas/edit/:id', async (req, res) =>{
    const nota = await Nota.findById(req.params.id);
    res.render('notas/editar-nota', {nota});
});

router.put('/notas/editar-nota/:id', async (req, res) =>{
    const { titulo, descripcion } = req.body;
    await Nota.findByIdAndUpdate(req.params.id, { titulo, descripcion});
    req.flash('perfecto_msg', 'Nota Actualizada Satisfactoriamente');
    res.redirect('/notas');
});

router.delete('/notas/eliminar/:id', async (req, res) =>{
    await Nota.findByIdAndRemove(req.params.id);
    req.flash('perfecto_msg', 'Nota Eliminada Satisfactoriamente');
    res.redirect('/notas');
});

module.exports = router;