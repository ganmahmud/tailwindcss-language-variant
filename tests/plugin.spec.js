const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const cssMatcher = require('jest-matcher-css');

const defaultConfig = require('tailwindcss/defaultConfig');
const plugin = require('../index');

const config = {
	...defaultConfig,
	plugins: [plugin],
};

expect.extend({
    toMatchCss: cssMatcher,
});



test('SHOULD generate lang-bn variant without language config', async () => {
    const input = `
        .test {
            @apply lang-bn:font-bold;
        }
    `;

    const result = await postcss(tailwindcss(config)).process(input, {
        from: undefined,
    });

    expect(result.css).toMatchCss(`
        [lang="bn"] .test {
            font-weight: 700
        }
    `);
    
});

test('SHOULD generate lang-bn variant with language config set to en', async () => {
    config.theme.languages = ['en'];
    const input = `
        .test {
            @apply lang-en:font-bold;
        }
    `;

    const result = await postcss(tailwindcss(config)).process(input, {
        from: undefined,
    });

    expect(result.css).toMatchCss(`
        [lang="en"] .test {
            font-weight: 700
        }
    `);
        
});

test('SHOULD generate lang-bn and lang-en variant with language config set to both', async () => {
    config.theme.languages = ['bn', 'en'];
    const input = `
        .test {
            @apply lang-en:font-bold;
            @apply lang-bn:font-bold;
        }
    `;

    const result = await postcss(tailwindcss(config)).process(input, {
        from: undefined,
    });

    expect(result.css).toMatchCss(`
        [lang="en"] .test {
            font-weight: 700
        }
        [lang="bn"] .test {
            font-weight: 700
        }
    `);
        
});

