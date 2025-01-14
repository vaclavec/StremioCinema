const { format, formatAudio, validateInput } = require('../helpers/helpers.js');

describe('Helpers', () => {
    test('format should convert value to uppercase', () => {
        const result = format('test');
        expect(result).toBe('TEST');
    });

    test('formatAudio should format audio value', () => {
        const result = formatAudio('stereo');
        expect(result).toBe('Audio: stereo');
    });

    test('validateInput should validate string input', () => {
        const result = validateInput('test', 'string');
        expect(result).toBe(true);
    });

    test('validateInput should validate number input', () => {
        const result = validateInput(123, 'number');
        expect(result).toBe(true);
    });

    test('validateInput should validate boolean input', () => {
        const result = validateInput(true, 'boolean');
        expect(result).toBe(true);
    });

    test('validateInput should return false for invalid input', () => {
        const result = validateInput('test', 'number');
        expect(result).toBe(false);
    });
});