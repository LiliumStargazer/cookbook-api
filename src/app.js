require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/recipe', recipeRoutes);
app.use('/review', reviewRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connessione a MongoDB riuscita'))
    .catch(err => {
        console.error('Errore connessione MongoDB:', err);
        console.error('MONGO_URL:', process.env.MONGO_URL);
    });

module.exports = app;