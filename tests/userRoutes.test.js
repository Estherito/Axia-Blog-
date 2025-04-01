const request = require('supertest');
const app = require('../src/app'); // Import the app

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      username: 'testuser', // Include username
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should login and return a token', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});