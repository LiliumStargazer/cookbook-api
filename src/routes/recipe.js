const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// proteggo le rotte con il middleware auth
router.post('/', auth, recipeController.createRecipe);
router.get('/', auth, recipeController.getUserRecipes);
router.delete('/:id', auth, recipeController.deleteRecipe);

module.exports = router;
