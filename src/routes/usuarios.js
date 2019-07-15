const router = require('express').Router();

router.get('/usuarios/registro', (req, res) =>{
    res.render('usuarios/registro');
});
router.get('/usuarios/login', (req, res) =>{
    res.render('usuarios/login');
});

module.exports = router;