const plugin = require('tailwindcss/plugin');

const isValidLangugeConfig = (config) => { 
    let valid = false;
    if (config !== undefined && Array.isArray(config) && config.length > 0) {
        valid = true;
        config.some((lang) => {
            if (typeof lang !== 'string') {
                valid = false;
            }
        });
    }
    return valid;
}

const TailwindLangugeVariantPlugin = plugin(function ({ addVariant, e, config }) {
    const languages = isValidLangugeConfig(config('theme.languages')) ? config('theme.languages') : ['bn'];

    languages.forEach((lang) => {
        addVariant(`lang-${lang}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `html[lang="${lang}"] .${e(`lang-${lang}${separator}${className}`)}`;
            });
        });
    });
});

module.exports = TailwindLangugeVariantPlugin;