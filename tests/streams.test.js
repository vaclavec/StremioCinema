const request = require('supertest');
const express = require('express');
const streamsRoute = require('../routes/streams.js');

const app = express();
app.use('/streams', streamsRoute);

describe('Streams Route', () => {
    test('should return 400 if type or id is missing', async () => {
        const response = await request(app).get('/streams/movie/');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Type and ID are required parameters');
    });

    test('should return streams with valid type and id', async () => {
        const response = await request(app).get('/streams/movie/123');
        expect(response.status).toBe(200);
        expect(response.body.streams).toBeDefined();
    });

    test('should apply filters to streams request', async () => {
        const response = await request(app).get('/streams/movie/123?quality=hd&language=en');
        expect(response.status).toBe(200);
        expect(response.body.streams).toBeDefined();
    });
});