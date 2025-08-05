// JavaScript
const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
    try {
        // Verifica se la ricetta esiste già per l'utente
        const existing = await Recipe.findOne({ strMeal: req.body.strMeal, userId: req.userId });
        if (existing) {
            return res.status(409).send('Ricetta già presente');
        }

        // Costruisci gli array ingredienti/misure se arrivano come campi separati
        const strIngredients = [];
        const strMeasures = [];
        for (let i = 1; i <= 20; i++) {
            if (req.body[`strIngredient${i}`]) strIngredients.push(req.body[`strIngredient${i}`]);
            if (req.body[`strMeasure${i}`]) strMeasures.push(req.body[`strMeasure${i}`]);
        }

        const recipeData = {
            ...req.body,
            userId: req.userId,
            strIngredients,
            strMeasures
        };

        const recipe = new Recipe(recipeData);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err){
        console.log('Errore dettagliato:', err);
        res.status(500).send('Errore nella creazione della ricetta');
    }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.userId });
    res.json(recipes);
  } catch {
    res.status(500).send('Errore nel recupero delle ricette');
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!recipe) return res.status(404).send('Ricetta non trovata');
    res.send('Ricetta eliminata');
  } catch {
    res.status(500).send('Errore nella cancellazione');
  }
};