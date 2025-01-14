const qs = require('querystring');
const Logger = require('../helpers/logger.js');
const call = require('../api.js');

const logger = new Logger("CATALOGS", true);

async function getCatalogs(type, id, extra) {
    try {
        const query = qs.stringify(extra);
        const url = `https://webshare.cz/api/catalogs/${type}/${id}.json?${query}`;
        const response = await call('get', url);
        if (response.statusCode === 200 && response.body && response.body.catalogs) {
            return response.body.catalogs;
        } else {
            throw new Error(`Failed to fetch catalogs from ${url}`);
        }
    } catch (error) {
        logger.error(`Error fetching catalogs: ${error.message}`);
        throw error;
    }
}

module.exports = async (req, res) => {
    const { type, id } = req.params;
    const extra = req.query;

    // Validace vstupů
    if (!type || !id) {
        return res.status(400).send({ error: 'Type and ID are required parameters' });
    }

    // Přidání pokročilého vyhledávání
    const validFilters = ['genre', 'year', 'language'];
    const filters = {};
    validFilters.forEach(filter => {
        if (extra[filter]) {
            filters[filter] = extra[filter];
        }
    });

    try {
        const catalogs = await getCatalogs(type, id, filters);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ catalogs }));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};