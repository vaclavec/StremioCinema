const call = require('./api.js');
const Logger = require('../helpers/logger.js');

const logger = new Logger("ADDONS", true);

async function metaCinemata(itemType, itemImdbId) {
    return await metaAddon(`https://cinemeta-live.strem.io/meta/${itemType}/${itemImdbId}.json`);
}

async function metaTmdb(itemType, itemTmdbId, language) {
    return await metaAddon(`https://94c8cb9f702d-tmdb-addon.baby-beamup.club/%7B%22include_adult%22%3A%22true%22%2C%22language%22%3A%22${language}%22%7D/meta/${itemType}/tmdb:${itemTmdbId}.json`);
}

async function metaWebshare(itemType, itemId) {
    return await metaAddon(`https://webshare.cz/api/meta/${itemType}/${itemId}.json`);
}

async function metaAddon(url) {
    const res = await call('get', url);
    if (res.statusCode === 200 && res.body && res.body.meta) {
        return res.body.meta;
    } else {
        throw new Error(`Failed to fetch metadata from ${url}`);
    }
}

async function getAddon(type, id, extra) {
    try {
        const query = new URLSearchParams(extra).toString();
        const url = `https://webshare.cz/api/addons/${type}/${id}.json?${query}`;
        const response = await call('get', url);
        if (response.statusCode === 200 && response.body && response.body.addon) {
            return response.body.addon;
        } else {
            throw new Error(`Failed to fetch addon from ${url}`);
        }
    } catch (error) {
        logger.error(`Error fetching addon: ${error.message}`);
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
        const addon = await getAddon(type, id, filters);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ addon }));
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    metaCinemata,
    metaTmdb,
    metaWebshare,
};