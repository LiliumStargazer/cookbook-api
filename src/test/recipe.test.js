const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('../routes/recipe');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/recipe', recipeRoutes);

let token;
let userId;
let recipeId;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
  // Crea utente di test
  const user = new User({ username: 'ricettatore', password: 'pass', email: 'ricettatore@example.com' });
  await user.save();
  userId = user._id;
  token = jwt.sign({ userId }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Recipe Routes', () => {
  test('POST /recipe/ crea una ricetta', async () => {
    const res = await request(app)
      .post('/recipe')
      .set('Authorization', `Bearer ${token}`)
      .send({
          strMeal: 'Lasagna',
          strCategory: 'Pasta',
          strArea: 'Italiana',
          strInstructions: 'Cuoci la pasta, prepara il sugo...',
          strMealThumb: 'url',
          strTags: 'primo',
          strYoutube: 'url',
          strIngredients: ['Pasta', 'Carne'],
          strMeasures: ['500g', '300g'],
          userId
      });
    if (res.statusCode !== 201) {
        console.log('Status:', res.statusCode);
        console.log('Body:', res.body);
        console.log('Text:', res.text);
    }
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    recipeId = res.body._id;
  });

  test('GET /recipe restituisce le ricette utente', async () => {
    const res = await request(app)
      .get('/recipe')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('DELETE /recipe/:id cancella la ricetta', async () => {
    const res = await request(app)
      .delete(`/recipe/${recipeId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Ricetta eliminata/);
  });
});

