const path = require('path');
const express = require('express');
const Logger = require('../helpers/logger.js');
const settings = require('../helpers/settings.js');

const logger = new Logger("CONFIGURE", true);
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'www', 'configure.html'));
});

router.get('/configure', (req, res) => {
    try {
        const configPath = path.join(__dirname, '..', 'configure.html');
        res.sendFile(configPath);
    } catch (error) {
        logger.error(`Error loading configuration page: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});

router.get('/options', (req, res) => {
    const options = {
        languages: [
            { code: 'cs_CZ', name: 'Czech' },
            { code: 'sk_SK', name: 'Slovak' },
            { code: 'en_US', name: 'English' }
        ],
        genres: [
            'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'
        ]
    };
    res.json(options);
});

router.post('/configure', (req, res) => {
    try {
        const newSettings = req.body;
        settings.saveSettings(newSettings);
        res.status(200).send({ message: 'Settings saved successfully' });
    } catch (error) {
        logger.error(`Error saving settings: ${error.message}`);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;