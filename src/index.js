const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Inicialización de la base de datos
const app = express();
require('./basededatos');

// Configuraciones
app.set('port', process.env.PORT || 3000);
                //Aqui va el puerto que nos da el server
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'myloveisKarla',
    resave: true,
    saveUninitialized: true
}));

// Variables Globales


// Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notas'));
app.use(require('./routes/usuarios'));


// Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

// El servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log('El servidor esta en el puerto', app.get('port'));
});