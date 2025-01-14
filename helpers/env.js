function toBoolean(value, def) {
    if (value === undefined || value === null) {
        return def;
    }
    return value.toString().toLowerCase() === 'true';
}

const env = {
    PORT: process.env.PORT || 7001,
    USE_HTTPS: toBoolean(process.env.USE_HTTPS, false),
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    WS_TOKEN: process.env.WS_TOKEN || ''
};

module.exports = env;
module.exports.toBoolean = toBoolean;