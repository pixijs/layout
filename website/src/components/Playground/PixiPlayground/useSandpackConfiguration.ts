import { useMemo } from 'react';

const indexHTML = `
<!DOCTYPE html>
  <html>
  <head>
  <title>PixiJS Playground</title>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="src/styles.css">
</head>
<body>
  <script src="src/index.js"></script>
</body>
</html>`;

// We need to tweak the sandpack vanilla js template a little to get exactly what we want.
// The way the template, files and customSetup are merged together by sandpack is a little
// opaque and also took some trial and error to get right. This way gives us the best
// babel configuration I could find (.browserslistrc isn't working and preset-env targets
// are out of date, but it seems OK), while also allowing the best "open in sandbox"
// functionality with all required dependencies
export const useFiles = (code: string, extraFiles?: Record<string, string>) =>
    useMemo(
        () => ({
            '.babelrc': {
                code: JSON.stringify(
                    {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'entry',
                                    corejs: '3.29',
                                    targets: 'last 2 chrome versions',
                                },
                            ],
                        ],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                    null,
                    2,
                ),
            },
            'src/styles.css': `body { margin: 0; overflow: hidden; }`,
            'src/index.js': code,
            'index.html': indexHTML,
            'sandbox.config.json': `{
                "infiniteLoopProtection": false
            }`,
            'package.json': {
                code: JSON.stringify(
                    {
                        scripts: {
                            start: 'parcel index.html --open',
                            build: 'parcel build index.html',
                        },
                    },
                    null,
                    2,
                ),
            },
            ...extraFiles,
        }),
        [code, extraFiles],
    );

type UseDependenciesParams = {
    isPixiWebWorkerVersion: boolean;
    isPixiDevVersion: boolean;
    pixiVersion: string;
    extraPackages?: Record<string, string>;
};

const useDependencies = ({
    isPixiWebWorkerVersion,
    isPixiDevVersion,
    pixiVersion,
    extraPackages,
}: UseDependenciesParams) =>
    useMemo(() => {
        const pixiPackageName = isPixiWebWorkerVersion ? '@pixi/webworker' : 'pixi.js';
        const getPackageVersion = (packageName: string) =>
            isPixiDevVersion ? `${pixiVersion}/${packageName}` : pixiVersion;
        const packages = [pixiPackageName];

        const dependencies = {
            ...packages.reduce(
                (deps, packageName) => ({
                    ...deps,
                    [packageName]: getPackageVersion(packageName),
                }),
                {},
            ),
            ...extraPackages,
        };

        return {
            dependenciesKey: `${pixiPackageName}-${pixiVersion}`,
            dependencies,
        };
    }, [isPixiDevVersion, isPixiWebWorkerVersion, pixiVersion, extraPackages]);

type UseSandpackConfigurationParams = UseDependenciesParams & {
    code: string;
    extraFiles?: Record<string, string>;
    extraPackages?: Record<string, string>;
};

export const useSandpackConfiguration = ({
    code,
    extraFiles,
    extraPackages,
    isPixiWebWorkerVersion,
    isPixiDevVersion,
    pixiVersion,
}: UseSandpackConfigurationParams) => {
    // We use '!' and '*' at the end of extra files' key for handling custom behaviours on the tabs
    // Therefore, we need to remove these marks from the file keys before passing it to useFiles
    const processedExtraFiles = Object.fromEntries(
        Object.entries(extraFiles ?? {}).map(([key, value]) => [key.replace(/[!*]/g, ''), value]),
    );
    const files = useFiles(code, processedExtraFiles);

    const { dependenciesKey, dependencies } = useDependencies({
        isPixiWebWorkerVersion,
        isPixiDevVersion,
        pixiVersion,
        extraPackages,
    });

    // TODO: adding code here is only necessary because of user edited code, otherwise we
    // could flip between examples easily, investigate why it bugs out during editing
    const key = `${dependenciesKey}-${code}-${Object.values(extraFiles ?? {}).join('-')}`;

    const customSetup: Record<string, any> = {
        entry: 'index.html',
        dependencies,
        devDependencies: {
            'parcel-bundler': '^1.6.1',
            '@babel/core': '^7.21.3',
            '@babel/plugin-proposal-class-properties': '^7.10.1',
        },
    };

    return {
        files,
        key,
        customSetup,
    };
};
