const request = require('supertest');
const app = require('../app');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password'
    });
    expect(response.statusCode).toBe(201);
  });

  it('should login with valid credentials', async () => {
    const response = await request(app).post('/auth/login').send({
      username: 'testuser',
      password: 'password'
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
