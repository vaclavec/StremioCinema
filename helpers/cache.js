const apicache = require('apicache');
const env = require('./env.js');

let cache = apicache.middleware;

function initRoutes(app) {
    app.use(cache('5 minutes')); // Nastavení cache na 5 minut
}

module.exports = {
    cache,
    initRoutes
}