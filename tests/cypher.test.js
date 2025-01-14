const { encrypt, decrypt } = require('../helpers/cypher.js');

describe('Cypher', () => {
    test('should encrypt and decrypt text', () => {
        const text = 'Hello, World!';
        const encrypted = encrypt(text);
        const decrypted = decrypt(encrypted);
        expect(decrypted).toBe(text);
    });

    test('should return different encrypted values for the same text', () => {
        const text = 'Hello, World!';
        const encrypted1 = encrypt(text);
        const encrypted2 = encrypt(text);
        expect(encrypted1).not.toBe(encrypted2);
    });

    test('should throw error for invalid encrypted text', () => {
        expect(() => decrypt('invalid text')).toThrow();
    });
});