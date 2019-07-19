const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena' 
}, async (correo, contrasena, done) =>{
    const usuario = await Usuario.findOne({ correo: correo });
    if (!usuario) {
        return done(null, false, { message: 'Usuario no Encontrado' });
    }else{
        const match = await usuario.matchPassword(contrasena);
        if (match) {
            return done(null, usuario);
        }else{
            return done(null, false, { message: 'Contraseña Incorrecta' }); 
        }
    }
}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    Usuario.findById(id, (err, user) =>{
        done(err, user);
    });
});