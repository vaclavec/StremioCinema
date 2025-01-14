const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const { start } = require('../helpers/certs.js');

jest.mock('fs');
jest.mock('https');

describe('Certs', () => {
    let app;

    beforeEach(() => {
        app = express();
    });

    test('should load certificates and start HTTPS server', () => {
        fs.readFileSync.mockReturnValue('fake-cert');
        https.createServer.mockReturnValue({
            listen: jest.fn((port, callback) => callback())
        });

        start(app, 3000, true, () => {
            expect(fs.readFileSync).toHaveBeenCalledWith(path.join(__dirname, '..', 'certs', 'key.pem'));
            expect(fs.readFileSync).toHaveBeenCalledWith(path.join(__dirname, '..', 'certs', 'cert.pem'));
            expect(https.createServer).toHaveBeenCalled();
        });
    });

    test('should start HTTP server if useHttps is false', () => {
        const listenMock = jest.fn((port, callback) => callback());
        app.listen = listenMock;

        start(app, 3000, false, () => {
            expect(listenMock).toHaveBeenCalledWith(3000, expect.any(Function));
        });
    });
});