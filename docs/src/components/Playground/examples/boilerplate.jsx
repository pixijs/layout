import { Application, extend, useApplication } from '@pixi/react';
import { Assets } from 'pixi.js';

import { useEffect, useState } from 'react';
import { Container, Sprite } from 'pixi.js';
// NOTE: this should be replaced with `@pixi/layout/components`
import { LayoutContainer } from '/layout/components';

// extend tells @pixi/react what Pixi.js components are available
extend({
    Container,
    LayoutContainer,
    Sprite,
});

const LayoutResizer = ({ children }) => {
    const { app } = useApplication();

    void app.renderer.layout.enableDebug(true);
    app.stage.layout = {
        width: window.innerWidth,
        height: window.innerHeight,
        justifyContent: 'center',
        alignItems: 'center',
    };

    useEffect(() => {
        // enable the layout
        app.renderer.layout.enableDebug(true);
        console.log('app.stage.layout', app.stage.layout);
        // listen for resize events on the renderer
        app.renderer.on('resize', () => {
            app.stage.layout = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        });
    }, [app.renderer]);

    return children;
};

export default function App({ children, assets }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const start = async () => {
            assets ??= [];
            const parsedAssets = assets.map((asset) => {
                if (asset.startsWith('https://fakeimg.pl/')) {
                    return {
                        alias: asset,
                        src: asset,
                        loadParser: 'loadTextures',
                    };
                }

                return asset;
            });

            // Perform async initialization here
            await Assets.load(parsedAssets);
            setIsInitialized(true);
        };

        void start();
    }, []);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <Application resizeTo={window} background={'#1C1C1D'}>
            <LayoutResizer>{children}</LayoutResizer>
        </Application>
    );
}
