const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); //Remplace ensureIndex par createIndex (mise à jour)
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Lier la bdd
mongoose.connect('mongodb+srv://Crob:nUEFO09Dlqxpr78S@cluster0.qxjpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//bodyParser plus utile pour cette version d'express 
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

//Utiliser le router
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;