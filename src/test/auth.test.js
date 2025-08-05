const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/auth');
require('dotenv').config();
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

// Mock connessione a MongoDB (usa una memoria in-memory o una connessione di test)
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', );
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Auth Routes', () => {
  let token;
  const testUser = {
    username: 'testuser',
    password: 'tespassword',
    email: 'testuser@example.com',
    favoriteDishes: ['Pizza']
  };

  test('POST /auth/register', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.text).toMatch(/Utente registrato/);
  });

  test('POST /auth/login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: testUser.username, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

test('PUT /auth/user', async () => {
    expect(token).toBeDefined();
    const res = await request(app)
        .put('/auth/user')
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'newemail@example.com' });
    if (res.statusCode !== 200) console.log('Response:', res.body || res.text);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('newemail@example.com');
});

  test('DELETE /auth/user', async () => {
    const res = await request(app)
      .delete('/auth/user')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    if (res.statusCode !== 200) console.log('Response:', res.body || res.text);
    expect(res.text).toMatch(/Utente e ricette eliminate/);
  });
});

