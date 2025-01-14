const { addonBuilder } = require('stremio-addon-sdk');
const Logger = require('../helpers/logger.js');
const env = require('../helpers/env.js');

const logger = new Logger("STREMIO", true);

const manifest = {
    id: 'org.stremio.cinema',
    version: '1.0.0',
    name: 'Stremio Cinema',
    description: 'Watch movies and TV shows from various sources.',
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series'],
    catalogs: [
        {
            type: 'movie',
            id: 'cinema-movies',
            name: 'Movies'
        },
        {
            type: 'series',
            id: 'cinema-series',
            name: 'TV Shows'
        }
    ],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async (args) => {
    logger.info(`Catalog request: ${JSON.stringify(args)}`);
    // Implementace logiky pro zpracování požadavků na katalog
    return { metas: [] };
});

builder.defineMetaHandler(async (args) => {
    logger.info(`Meta request: ${JSON.stringify(args)}`);
    // Implementace logiky pro zpracování požadavků na metadata
    return { meta: {} };
});

builder.defineStreamHandler(async (args) => {
    logger.info(`Stream request: ${JSON.stringify(args)}`);
    // Implementace logiky pro zpracování požadavků na streamy
    return { streams: [] };
});

module.exports = builder.getInterface();