// JavaScript
const Review = require('../models/Review');

// Crea una recensione
exports.createReview = async (req, res) => {
  try {
    const review = new Review({
      idMeal: req.body.idMeal,
      userId: req.userId,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.save();
    res.status(201).json(review);
  } catch {
    res.status(500).send('Errore nella creazione della recensione');
  }
};

// Ottieni tutte le recensioni per una ricetta
exports.getReviewsByMeal = async (req, res) => {
  try {
    const reviews = await Review.find({ idMeal: req.params.idMeal });
    res.json(reviews);
  } catch {
    res.status(500).send('Errore nel recupero delle recensioni');
  }
};

// Cancella una recensione
exports.deleteReview = async (req, res) => {
  try {
    await Review.deleteOne({ _id: req.params.id, userId: req.userId });
    res.status(204).send();
  } catch {
    res.status(500).send('Errore nella cancellazione della recensione');
  }
};