// filepath: /Users/alghisi/WebstormProjects/cookbook-api/src/test/mealdbRoutes.test.js
const request = require('supertest');
const express = require('express');
const mealdbRoutes = require('../routes/mealdbRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/mealdb', mealdbRoutes);

describe('MealDB Routes', () => {
  test('GET /mealdb/search should return meal data', async () => {
    const res = await request(app).get('/mealdb/search?s=Arrabiata');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('meals');
  });

  test('GET /mealdb/search-by-letter should return meals by letter', async () => {
    const res = await request(app).get('/mealdb/search-by-letter?f=a');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('meals');
  });

  test('GET /mealdb/lookup should return meal details by id', async () => {
    const res = await request(app).get('/mealdb/lookup?i=52771');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('meals');
  });
});

