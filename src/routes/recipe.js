const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// proteggo le rotte con il middleware auth
router.post('/api/recipes', auth, recipeController.createRecipe);
router.get('/api/recipes', auth, recipeController.getUserRecipes);
router.delete('/api/recipes/:id', auth, recipeController.deleteRecipe);

module.exports = router;
