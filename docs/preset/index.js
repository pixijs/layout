/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function makePluginConfig(source, options) {
    if (options) {
        return [require.resolve(source), options];
    }

    return require.resolve(source);
}

export default function preset(context, opts = {}) {
    const { siteConfig } = context;
    const { themeConfig } = siteConfig;
    const isProd = process.env.NODE_ENV === 'production';
    const { debug, docs, blog, pages, sitemap, svgr, theme, googleAnalytics, gtag, googleTagManager, ...rest } = opts;

    const themes = [];

    themes.push(makePluginConfig('@docusaurus/theme-classic', theme));

    if ('gtag' in themeConfig) {
        throw new Error(
            'The "gtag" field in themeConfig should now be specified as option for plugin-google-gtag. For preset-classic, simply move themeConfig.gtag to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
        );
    }
    if ('googleAnalytics' in themeConfig) {
        throw new Error(
            'The "googleAnalytics" field in themeConfig should now be specified as option for plugin-google-analytics. For preset-classic, simply move themeConfig.googleAnalytics to preset options. More information at https://github.com/facebook/docusaurus/pull/5832.',
        );
    }

    const plugins = [];

    if (docs !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-docs', docs));
    }
    if (blog !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-blog', blog));
    }
    if (pages !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-content-pages', pages));
    }
    if (googleAnalytics) {
        plugins.push(makePluginConfig('@docusaurus/plugin-google-analytics', googleAnalytics));
    }
    if (debug || (debug === undefined && !isProd)) {
        plugins.push(require.resolve('@docusaurus/plugin-debug'));
    }
    if (gtag) {
        plugins.push(makePluginConfig('@docusaurus/plugin-google-gtag', gtag));
    }
    if (googleTagManager) {
        plugins.push(makePluginConfig('@docusaurus/plugin-google-tag-manager', googleTagManager));
    }
    if (sitemap !== false && (isProd || debug)) {
        plugins.push(makePluginConfig('@docusaurus/plugin-sitemap', sitemap));
    }
    if (svgr !== false) {
        plugins.push(makePluginConfig('@docusaurus/plugin-svgr', svgr));
    }
    if (Object.keys(rest).length > 0) {
        throw new Error(
            `Unrecognized keys ${Object.keys(rest).join(
                ', ',
            )} found in preset-classic configuration. The allowed keys are debug, docs, blog, pages, sitemap, theme, googleAnalytics, gtag, and googleTagManager. Check the documentation: https://docusaurus.io/docs/using-plugins#docusauruspreset-classic for more information on how to configure individual plugins.`,
        );
    }

    return { themes, plugins };
}
