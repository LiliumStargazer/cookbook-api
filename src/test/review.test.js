const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const reviewRoutes = require('../routes/review');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/review', reviewRoutes);

let token;
let userId;
let reviewId;
const testMealId = '12345';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb');
  // Crea utente di test
  const user = new User({ username: 'reviewer', password: 'pass', email: 'reviewer@example.com' });
  await user.save();
  userId = user._id;
  token = jwt.sign({ userId }, process.env.JWT_SECRET);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Review Routes', () => {
  test('POST /review crea una recensione', async () => {
    const res = await request(app)
      .post('/review')
      .set('Authorization', `Bearer ${token}`)
      .send({
        idMeal: testMealId,
        difficulty: 3,
        taste: 4,
        preparationDate: new Date().toISOString(),
        rating: 5,
        comment: 'Ottima!'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    reviewId = res.body._id;
  });

  test('GET /review/meal/:idMeal restituisce le recensioni della ricetta', async () => {
    const res = await request(app)
      .get(`/review/meal/${testMealId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('DELETE /review/:id cancella la recensione', async () => {
    const res = await request(app)
      .delete(`/review/${reviewId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(204);
  });
});

