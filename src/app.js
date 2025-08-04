require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const reviewRoutes = require('./routes/review');

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/reviews', reviewRoutes);

mongoose.connect(process.env.MONGO_URL).catch(console.error);

module.exports = app;