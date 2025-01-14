const { settingsLoader } = require('../helpers/settings.js');

describe('Settings Loader', () => {
    beforeEach(() => {
        // Vyčistíme localStorage před každým testem
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.clear();
        }
    });

    test('should load default settings if no input is provided', () => {
        const settings = settingsLoader();
        expect(settings.tmdbEnabled).toBe(false);
        expect(settings.tmdbMainLang).toBe("sk-SK");
        expect(settings.tmdbFallbackLang).toBe("cs-CZ");
        expect(settings.allowExplicit).toBe(false);
        expect(settings.pageSize).toBe(10);
    });

    test('should load settings from localStorage if available', () => {
        const savedSettings = {
            tmdbEnabled: true,
            tmdbMainLang: "en-US",
            tmdbFallbackLang: "sk-SK",
            allowExplicit: true,
            pageSize: 20
        };
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('stremioCinemaSettings', JSON.stringify(savedSettings));
        }
        const settings = settingsLoader();
        expect(settings.tmdbEnabled).toBe(true);
        expect(settings.tmdbMainLang).toBe("en-US");
        expect(settings.tmdbFallbackLang).toBe("sk-SK");
        expect(settings.allowExplicit).toBe(true);
        expect(settings.pageSize).toBe(20);
    });

    test('should override localStorage settings with input', () => {
        const savedSettings = {
            tmdbEnabled: true,
            tmdbMainLang: "en-US",
            tmdbFallbackLang: "sk-SK",
            allowExplicit: true,
            pageSize: 20
        };
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('stremioCinemaSettings', JSON.stringify(savedSettings));
        }
        const inputSettings = {
            tmdbEnabled: false,
            pageSize: 15
        };
        const settings = settingsLoader(inputSettings);
        expect(settings.tmdbEnabled).toBe(false);
        expect(settings.tmdbMainLang).toBe("en-US");
        expect(settings.tmdbFallbackLang).toBe("sk-SK");
        expect(settings.allowExplicit).toBe(true);
        expect(settings.pageSize).toBe(15);
    });
});