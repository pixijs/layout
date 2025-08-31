import './manager.css';
import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
    theme: create({
        base: 'dark',
        colorPrimary: '#e91e63',
        colorSecondary: '#e91e63',
        appBorderRadius: 4,
        fontCode: 'monospace',
        // inputBg: '#e91e63',
        // input
        // appBg: '#2D2D2D',
        // appContentBg: '#FFFFFF',
        // appBorderColor: '#EAEAEA',
        // fontBase: '"Helvetica Neue", "Segoe UI", sans-serif',
        // textColor: '#333333',
        // textInverseColor: '#FFFFFF',
        // barTextColor: '#FFFFFF',
        // barSelectedColor: '#1EA7FD',
        // barBg: '#e91e63',
        // inputBorder: '#EAEAEA',
        // inputTextColor: '#333333',
        // inputBorderRadius: 4,

        brandTitle: 'PixiLayout',
        brandImage: 'https://github.com/pixijs/layout/raw/main/.github/logo-dark.svg',
        brandUrl: 'https://github.com/pixijs/layout',
    }),
});
