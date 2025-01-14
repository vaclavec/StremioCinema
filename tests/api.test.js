const call = require('../api/api.js');
const nock = require('nock');

describe('API Call', () => {
    const baseUrl = 'https://webshare.cz';

    afterEach(() => {
        nock.cleanAll();
    });

    test('should successfully call API', async () => {
        nock(baseUrl)
            .get('/api/test')
            .reply(200, { success: true });

        const response = await call('get', `${baseUrl}/api/test`);
        expect(response.body.success).toBe(true);
    });

    test('should retry API call on failure', async () => {
        nock(baseUrl)
            .get('/api/test')
            .reply(500, { success: false })
            .get('/api/test')
            .reply(200, { success: true });

        const response = await call('get', `${baseUrl}/api/test`);
        expect(response.body.success).toBe(true);
    });

    test('should throw error after max retries', async () => {
        nock(baseUrl)
            .get('/api/test')
            .times(4)
            .reply(500, { success: false });

        await expect(call('get', `${baseUrl}/api/test`, null, 3)).rejects.toThrow();
    });
});