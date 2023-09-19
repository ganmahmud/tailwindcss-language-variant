module.exports = function ({ addVariant, e, config }) {
    if (!config('theme.languages')) {
        config('theme.languages', ['bn']);
    }
    config('theme.languages').forEach((lang) => {
        addVariant(`lang-${lang}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                return `[lang="${lang}"] .${e(`lang-${lang}${separator}${className}`)}`;
            });
        });
    });
}