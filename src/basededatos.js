const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://SuperPapu:Ianpaul2014@cluster0-dzohh.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('La base de datos se conecto exitosamente'))
.catch(err => console.log(err));