const request = require('supertest');
const express = require('express');
const { initRoutes } = require('../helpers/cache.js');

describe('Cache Middleware', () => {
    let app;

    beforeEach(() => {
        app = express();
        initRoutes(app);
        app.get('/test', (req, res) => {
            res.json({ message: 'Hello, World!' });
        });
    });

    test('should cache responses', async () => {
        const response1 = await request(app).get('/test');
        const response2 = await request(app).get('/test');
        expect(response1.headers['x-cache']).toBeUndefined();
        expect(response2.headers['x-cache']).toBe('HIT');
    });

    test('should return fresh response after cache expiration', async () => {
        const response1 = await request(app).get('/test');
        await new Promise(resolve => setTimeout(resolve, 6000)); // Wait for cache to expire
        const response2 = await request(app).get('/test');
        expect(response1.headers['x-cache']).toBeUndefined();
        expect(response2.headers['x-cache']).toBeUndefined();
    });
});