import { useState } from 'react';
import { dracula } from './defaults/theme';
import { EditorLayout } from './Sandpack/Layout';
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
    dependencies = {},
    files = {},
    fontSize = 12,
    handleEditorCodeChanged,
    type = 'react',
}: EditorProps) {
    const { colorMode } = useColorMode();
    const filesWithoutIndexJs = { ...files };

    dependencies = {
        '@pixi/layout': 'latest',
        'pixi.js': 'latest',
        'yoga-layout': 'latest',
        ...dependencies,
    };
    if (type === 'react') {
        dependencies = {
            '@pixi/react': 'latest',
            react: '^19',
            'react-dom': '^19',
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
