const { hashPassword, verifyPassword } = require('../helpers/crypt.js');

describe('Crypt', () => {
    test('should hash and verify password', async () => {
        const password = 'mysecretpassword';
        const hash = await hashPassword(password);
        const isMatch = await verifyPassword(password, hash);
        expect(isMatch).toBe(true);
    });

    test('should not verify incorrect password', async () => {
        const password = 'mysecretpassword';
        const hash = await hashPassword(password);
        const isMatch = await verifyPassword('wrongpassword', hash);
        expect(isMatch).toBe(false);
    });

    test('should generate different hashes for the same password', async () => {
        const password = 'mysecretpassword';
        const hash1 = await hashPassword(password);
        const hash2 = await hashPassword(password);
        expect(hash1).not.toBe(hash2);
    });
});