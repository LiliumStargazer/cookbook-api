const User = require('../models/User');
const Recipe = require('../models/Recipe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateUserData = require('../utils/validateUser');
const validateUserUpdate = require('../utils/validateUserUpdate');

exports.register = async (req, res) => {
  const error = validateUserData(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const { username, password, email, favoriteDishes } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashed, email, favoriteDishes });
    await user.save();
    const emptyRecipe = new Recipe({
      strMeal: 'Ricettario personale',
      title: 'Ricettario personale',
      ingredients: [],
      instructions: '',
      userId: user._id
    });
    await emptyRecipe.save();
    res.status(201).send('Utente registrato e ricettario creato');
  } catch (err) {
    console.error('Errore in register:', err);
    res.status(500).send('Errore del server');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username e password sono obbligatori');
    }
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Credenziali non valide');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).send('Errore del server');
  }
};

exports.updateUser = async (req, res) => {
    if (!req.userId) {
        return res.status(401).send('Utente non autenticato');
    }
  const error = validateUserUpdate(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    if (!user) return res.status(404).send('Utente non trovato');
    res.json(user);
  } catch {
    res.status(500).send('Errore del server');
  }
};

exports.deleteUser = async (req, res) => {
  if (!req.userId) {
    return res.status(401).send('Utente non autenticato');
  }
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) return res.status(404).send('Utente non trovato');
    await Recipe.deleteMany({ userId: req.userId });
    res.send('Utente e ricette eliminate');
  } catch {
    res.status(500).send('Errore del server');
  }
};