const plugin = require('tailwindcss/plugin');

const TailwindLangugeVariantPlugin = plugin(function ({ addVariant, e, config }) {
    const languages = config('theme.languages') || ['bn'];

    languages.forEach((lang) => {
        addVariant(`lang-${lang}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `[lang="${lang}"] .${e(`lang-${lang}${separator}${className}`)}`;
            });
        });
    });
});

module.exports = TailwindLangugeVariantPlugin;