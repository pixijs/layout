import { defineConfig } from 'vitest/config';
import BrowserCommands from './tests/scripts/compare-command';

const instances = [{ browser: 'webkit' }];

export default defineConfig({
    plugins: [BrowserCommands()],
    publicDir: './tests/stories/public/',
    test: {
        include: ['tests/**/*.test.?(m)[jt]s?(x)'],
        browser: {
            enabled: true,
            instances,
            headless: true,
            viewport: { width: 300, height: 300 },
            screenshotFailures: false,
            provider: 'playwright',
        },
        setupFiles: ['./.storybook/vitest.setup.ts'],
    },
});
