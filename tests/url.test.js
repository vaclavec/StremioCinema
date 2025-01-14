const request = require('supertest');
const express = require('express');
const urlRoute = require('../routes/url.js');

const app = express();
app.use('/url', urlRoute);

describe('URL Route', () => {
    test('should return 400 if id is missing', async () => {
        const response = await request(app).get('/url/');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('ID is a required parameter');
    });

    test('should return URL with valid id', async () => {
        const response = await request(app).get('/url/123');
        expect(response.status).toBe(200);
        expect(response.body.url).toBeDefined();
    });

    test('should apply filters to URL request', async () => {
        const response = await request(app).get('/url/123?quality=hd&language=en');
        expect(response.status).toBe(200);
        expect(response.body.url).toBeDefined();
    });
});