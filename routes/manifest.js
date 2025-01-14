const Logger = require('../helpers/logger.js')
const env = require('../helpers/env.js')

const logger = new Logger("MANIFEST", true);

function manifest(req, res) {
    const lang = req.query.lang || 'en';
    const manifestData = {
        id: 'org.stremio.cinema',
        version: '1.0.0',
        name: 'Stremio Cinema',
        description: {
            en: 'Watch movies and TV shows from various sources.',
            cs: 'Sledujte filmy a televizní pořady z různých zdrojů.',
            sk: 'Sledujte filmy a televízne programy z rôznych zdrojov.'
        }[lang],
        resources: ['catalog', 'meta', 'stream'],
        types: ['movie', 'series'],
        catalogs: [
            {
                type: 'movie',
                id: 'cinema-movies',
                name: {
                    en: 'Movies',
                    cs: 'Filmy',
                    sk: 'Filmy'
                }[lang]
            },
            {
                type: 'series',
                id: 'cinema-series',
                name: {
                    en: 'TV Shows',
                    cs: 'Televizní pořady',
                    sk: 'Televízne programy'
                }[lang]
            }
        ],
        idPrefixes: ['tt']
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(manifestData));
}

module.exports = {
    manifest
}