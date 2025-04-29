import { useState } from 'react';
import { dracula } from './defaults/theme';
import { EditorLayout } from './Sandpack/Layout';
import libraryRaw from '!!raw-loader!../../build-sandpack/index.js';
import componentsRaw from '!!raw-loader!../../build-sandpack/index2.js';
import javascriptRaw from '!!raw-loader!./defaults/javascript.js';
import reactRaw from '!!raw-loader!./defaults/react.js';
import StylesFile from '!!raw-loader!./defaults/styles.css';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import { githubLight } from '@codesandbox/sandpack-themes';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';

export interface EditorProps {
    viewType?: 'both' | 'editor' | 'preview';
    type?: 'javascript' | 'react';
    showConsole?: boolean;
    width?: number | string;
    height?: number | string;
    dependencies?: Record<string, string>;
    files?: Record<string, { code: string; hidden?: boolean; active?: boolean } | string>;
    fontSize?: number;
    handleEditorCodeChanged?: (nextSourceCode: string | undefined) => void;
}

export function Editor({
    viewType = 'both',
    showConsole = false,
    width = '100%',
    height = '100%',
    dependencies = { 'pixi.js': 'latest' },
    files = {},
    fontSize = 12,
    handleEditorCodeChanged,
    type = 'react',
}: EditorProps) {
    const { colorMode } = useColorMode();
    const filesWithoutIndexJs = { ...files };

    if (type === 'javascript') {
        dependencies = {
            'pixi.js': 'latest',
            'yoga-layout': 'latest',
            ...dependencies,
        };
    } else {
        dependencies = {
            '@pixi/react': 'latest',
            'pixi.js': 'latest',
            react: '^19',
            'react-dom': '^19',
            'yoga-layout': 'latest',
            ...dependencies,
        };
    }

    const [filesState] = useState({
        '/styles.css': { code: StylesFile, hidden: true },
        'sandbox.config.json': { code: `{"infiniteLoopProtection": false}`, hidden: true },
        '/public/index.html': {
            code: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="root"></div>
            </body>
            </html>`,
            hidden: true,
        },
        '/index.js': {
            code: type === 'javascript' ? javascriptRaw : reactRaw,
            hidden: true,
        },
        '/layout/index.js': {
            hidden: true,
            code: libraryRaw,
        },
        '/layout/components.js': {
            hidden: true,
            code: componentsRaw,
        },
        ...filesWithoutIndexJs,
    });

    return (
        <BrowserOnly>
            {() => (
                <SandpackProvider
                    template="react"
                    theme={colorMode === 'dark' ? dracula : githubLight}
                    files={filesState}
                    customSetup={{
                        dependencies,
                        devDependencies: {
                            'babel-plugin-module-resolver': 'latest',
                        },
                    }}
                    style={{ height, width, margin: '0 auto', maxWidth: '100%' }}
                    options={{ recompileDelay: 500 }}
                >
                    <EditorLayout
                        fontSize={fontSize}
                        handleEditorCodeChanged={handleEditorCodeChanged}
                        pixiVersion={dependencies['pixi.js']}
                        showConsole={showConsole}
                        viewType={viewType}
                    />
                </SandpackProvider>
            )}
        </BrowserOnly>
    );
}
