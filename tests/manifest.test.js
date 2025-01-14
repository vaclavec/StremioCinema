const request = require('supertest');
const express = require('express');
const manifestRoute = require('../routes/manifest.js');

const app = express();
app.use('/manifest', manifestRoute);

describe('Manifest Route', () => {
    test('should return manifest in default language', async () => {
        const response = await request(app).get('/manifest.json');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Stremio Cinema');
        expect(response.body.description).toBe('Watch movies and TV shows from various sources.');
    });

    test('should return manifest in specified language', async () => {
        const response = await request(app).get('/manifest.json?lang=cs');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Stremio Cinema');
        expect(response.body.description).toBe('Sledujte filmy a televizní pořady z různých zdrojů.');
    });

    test('should return manifest with catalogs', async () => {
        const response = await request(app).get('/manifest.json');
        expect(response.status).toBe(200);
        expect(response.body.catalogs).toBeDefined();
        expect(response.body.catalogs.length).toBeGreaterThan(0);
    });
});