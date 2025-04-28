import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    framework: '@storybook/react-vite', // 👈 Add this
    stories: ['../tests/**/*.@(stories.@(tsx))'],
    staticDirs: ['../tests/stories/public/'],
};

export default config;
