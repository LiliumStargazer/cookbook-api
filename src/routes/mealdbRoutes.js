// JavaScript
const express = require('express');
const axios = require('axios');
const router = express.Router();
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Cerca pasto per nome
router.get('/search', async (req, res) => {
  try {
    const { s } = req.query;
    const response = await axios.get(`${BASE_URL}/search.php?s=${s}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nella ricerca del pasto');
  }
});

// Lista pasti per lettera
router.get('/search-by-letter', async (req, res) => {
  try {
    const { f } = req.query;
    const response = await axios.get(`${BASE_URL}/search.php?f=${f}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nella ricerca per lettera');
  }
});

// Dettagli pasto per id
router.get('/lookup', async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${i}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel lookup del pasto');
  }
});

// Pasto casuale
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel recupero del pasto casuale');
  }
});

// Tutte le categorie
router.get('/categories', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel recupero delle categorie');
  }
});

// Lista categorie, aree, ingredienti
router.get('/list', async (req, res) => {
  try {
    const { type } = req.query; // type: c, a, i
    const response = await axios.get(`${BASE_URL}/list.php?${type}=list`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel recupero della lista');
  }
});

// Filtra per ingrediente
router.get('/filter-by-ingredient', async (req, res) => {
  try {
    const { i } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?i=${i}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel filtro per ingrediente');
  }
});

// Filtra per categoria
router.get('/filter-by-category', async (req, res) => {
  try {
    const { c } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?c=${c}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel filtro per categoria');
  }
});

// Filtra per area
router.get('/filter-by-area', async (req, res) => {
  try {
    const { a } = req.query;
    const response = await axios.get(`${BASE_URL}/filter.php?a=${a}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).send('Errore nel filtro per area');
  }
});

module.exports = router;