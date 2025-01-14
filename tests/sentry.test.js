const Sentry = require('@sentry/node');
const { init } = require('../helpers/sentry.js');
const express = require('express');

describe('Sentry Initialization', () => {
    let app;

    beforeEach(() => {
        app = express();
    });

    test('should initialize Sentry with correct DSN', () => {
        process.env.SENTRY_DSN = 'https://examplePublicKey@o0.ingest.sentry.io/0';
        init(app);
        expect(Sentry.getCurrentHub().getClient().getOptions().dsn).toBe(process.env.SENTRY_DSN);
    });

    test('should add Sentry request handler middleware', () => {
        init(app);
        const middleware = app._router.stack.find(layer => layer.name === 'sentryRequestMiddleware');
        expect(middleware).toBeDefined();
    });

    test('should add Sentry error handler middleware', () => {
        init(app);
        const middleware = app._router.stack.find(layer => layer.name === 'sentryErrorMiddleware');
        expect(middleware).toBeDefined();
    });
});