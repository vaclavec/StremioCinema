const Logger = require('../helpers/logger.js');
const fs = require('fs');
const path = require('path');

describe('Logger', () => {
    const logFilePath = path.join(__dirname, '..', 'log.txt');

    beforeEach(() => {
        if (fs.existsSync(logFilePath)) {
            fs.unlinkSync(logFilePath);
        }
    });

    test('should log info message', () => {
        const logger = new Logger('TEST', true);
        logger.info('This is an info message');
        const logContent = fs.readFileSync(logFilePath, 'utf8');
        expect(logContent).toContain('INFO');
        expect(logContent).toContain('This is an info message');
    });

    test('should log warn message', () => {
        const logger = new Logger('TEST', true);
        logger.warn('This is a warn message');
        const logContent = fs.readFileSync(logFilePath, 'utf8');
        expect(logContent).toContain('WARN');
        expect(logContent).toContain('This is a warn message');
    });

    test('should log error message', () => {
        const logger = new Logger('TEST', true);
        logger.error('This is an error message');
        const logContent = fs.readFileSync(logFilePath, 'utf8');
        expect(logContent).toContain('ERROR');
        expect(logContent).toContain('This is an error message');
    });

    test('should not log message if logging is disabled', () => {
        const logger = new Logger('TEST', false);
        logger.info('This message should not be logged');
        const logExists = fs.existsSync(logFilePath);
        expect(logExists).toBe(false);
    });
});