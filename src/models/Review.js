// JavaScript
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  idMeal: { type: String, required: true }, // id della ricetta
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // id utente
  rating: { type: Number, min: 1, max: 5, required: true }, // voto
  comment: { type: String } // testo recensione
});

module.exports = mongoose.model('Review', reviewSchema);