modules.exports = function ({ addVariant, e, config }) {
    if (!config('theme.languages')) {
        config('theme.languages', ['en']);
    }
    config('theme.languages').forEach((lang) => {
        addVariant(`lang-${lang}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `[lang="${lang}"] .${e(`${lang}${separator}${className}`)}`;
            });
        });
    });
}