const request = require('supertest');
const express = require('express');
const metaRoute = require('../routes/meta.js');

const app = express();
app.use('/meta', metaRoute);

describe('Meta Route', () => {
    test('should return 400 if type or id is missing', async () => {
        const response = await request(app).get('/meta/movie/');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Type and ID are required parameters');
    });

    test('should return meta with valid type and id', async () => {
        const response = await request(app).get('/meta/movie/123');
        expect(response.status).toBe(200);
        expect(response.body.meta).toBeDefined();
    });

    test('should apply filters to meta request', async () => {
        const response = await request(app).get('/meta/movie/123?genre=action&year=2021');
        expect(response.status).toBe(200);
        expect(response.body.meta).toBeDefined();
    });
});