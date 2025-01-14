const request = require('supertest');
const express = require('express');
const catalogRoute = require('../routes/catalog.js');

const app = express();
app.use('/catalog', catalogRoute);

describe('Catalog Route', () => {
    test('should return 400 if type or id is missing', async () => {
        const response = await request(app).get('/catalog/movie/');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Type and ID are required parameters');
    });

    test('should return catalogs with valid type and id', async () => {
        const response = await request(app).get('/catalog/movie/123');
        expect(response.status).toBe(200);
        expect(response.body.catalog).toBeDefined();
    });

    test('should apply filters to catalog request', async () => {
        const response = await request(app).get('/catalog/movie/123?genre=action&year=2021');
        expect(response.status).toBe(200);
        expect(response.body.catalog).toBeDefined();
    });
});