const env = require('./env.js')
const Sentry = require("@sentry/node");
const ProfilingIntegration = require("@sentry/profiling-node").ProfilingIntegration;

function init(app) {
    Sentry.init({
        dsn: env.SENTRY_DSN,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new ProfilingIntegration(),
        ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    app.use(Sentry.Handlers.errorHandler());
}

module.exports = {
    init
}