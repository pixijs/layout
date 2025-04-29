import { themes as prismThemes } from 'prism-react-renderer';
import { type Options, type ThemeConfig } from './preset/options';

import type { Config } from '@docusaurus/types';

const config: Config = {
    title: 'PixiJS Layout',
    tagline: 'A Yoga powered layout library for PixiJS',
    favicon: 'img/favicon.png',

    // Set the production url of your site here
    url: 'https://layout.pixijs.io',
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'pixijs', // Usually your GitHub org/user name.
    projectName: 'layout', // Usually your repo name.
    deploymentBranch: 'gh-pages', // Branch that GitHub pages will deploy to.
    trailingSlash: true,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            './preset/index.js',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/pixijs/layout/tree/main/website/docs/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Options,
        ],
    ],

    themes: [
        // ... Your other themes.
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            {
                hashed: true,
                removeDefaultStemmer: true,
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: 'img/ogimage.jpg',
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
        navbar: {
            title: 'Layout',
            logo: {
                alt: 'PixiJS Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'guides',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    type: 'docSidebar',
                    sidebarId: 'examples',
                    position: 'left',
                    label: 'Examples',
                },
                {
                    type: 'doc',
                    docId: 'playground/index',
                    position: 'left',
                    label: 'Playground',
                },
                {
                    href: 'https://opencollective.com/pixijs',
                    className: 'header-link header-open-col-link',
                    'aria-label': 'Open Collective',
                    position: 'right',
                },
                {
                    href: 'https://twitter.com/pixijs',
                    position: 'right',
                    className: 'header-link header-twitter-link',
                    'aria-label': 'Twitter account',
                },
                {
                    href: 'https://discord.gg/CPTjeb28nH',
                    position: 'right',
                    className: 'header-link header-discord-link',
                    'aria-label': 'Discord server',
                },
                {
                    href: 'https://github.com/pixijs/layout',
                    position: 'right',
                    className: 'header-link header-github-link',
                    'aria-label': 'GitHub repository',
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash'],
        },
    } satisfies ThemeConfig,
};

export default config;
