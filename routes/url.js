const Logger = require('../helpers/logger.js');
const call = require('../api.js');

const logger = new Logger("URL", true);

async function getUrl(id, extra) {
    try {
        const query = new URLSearchParams(extra).toString();
        const url = `https://webshare.cz/api/url/${id}.json?${query}`;
        const response = await call('get', url);
        if (response.statusCode === 200 && response.body && response.body.url) {
            return response.body.url;
        } else {
            throw new Error(`Failed to fetch URL from ${url}`);
        }
    } catch (error) {
        logger.error(`Error fetching URL: ${error.message}`);
        throw error;
    }
}

module.exports = async (req, res) => {
    const { id } = req.params;
    const extra = req.query;

    // Validace vstupů
    if (!id) {
        return res.status(400).send({ error: 'ID is a required parameter' });
    }

    // Přidání pokročilého vyhledávání
    const validFilters = ['quality', 'language'];
    const filters = {};
    validFilters.forEach(filter => {
        if (extra[filter]) {
            filters[filter] = extra[filter];
        }
    });

    try {
        const url = await getUrl(id, filters);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ url }));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};