const request = require('supertest');
const express = require('express');
const configureRoute = require('../routes/configure.js');

const app = express();
app.use(express.json());
app.use('/configure', configureRoute);

describe('Configure Route', () => {
    test('should return configuration page', async () => {
        const response = await request(app).get('/configure');
        expect(response.status).toBe(200);
        expect(response.text).toContain('<title>Stremio Cinema</title>');
    });

    test('should return options for configuration', async () => {
        const response = await request(app).get('/configure/options');
        expect(response.status).toBe(200);
        expect(response.body.languages).toBeDefined();
        expect(response.body.genres).toBeDefined();
    });

    test('should save configuration settings', async () => {
        const newSettings = {
            tmdbEnabled: true,
            tmdbMainLang: "en-US",
            tmdbFallbackLang: "sk-SK",
            allowExplicit: true,
            pageSize: 20
        };
        const response = await request(app)
            .post('/configure')
            .send(newSettings);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Settings saved successfully');
    });

    test('should return error if saving configuration fails', async () => {
        const response = await request(app)
            .post('/configure')
            .send(null);
        expect(response.status).toBe(500);
        expect(response.body.error).toBeDefined();
    });
});