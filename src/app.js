require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(authRoutes);

mongoose.connect(process.env.MONGO_URL).catch(console.error);

module.exports = app;
