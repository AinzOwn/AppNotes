const router = require('express').Router();

router.get('/notas', (req, res) =>{
    res.send('Aqui van las notas');
});

module.exports = router;