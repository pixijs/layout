import { Assets, Container } from 'pixi.js';
import React, { useEffect, useRef, useState } from 'react';
import { Application, extend, useApplication } from '@pixi/react';
import {
    BitmapText,
    LayoutContainer,
    LayoutView,
    NineSliceSprite,
    Sprite,
    Text,
    TilingSprite,
} from '../../../../src/components';
import { Layout, Node } from '../../playground/Node';
import { useResize } from './useResize';
import '../../../../src/devtool';
import '../../../../src/index';
import '../../../../src/react';

extend({
    Container,
    Layout,
    Node,
    Text,
    Sprite,
    NineSliceSprite,
    TilingSprite,
    BitmapText,
    LayoutView,
    LayoutContainer,
});

interface ReactStoryProps {
    assets?: string[];
    children: React.ReactNode;
}

const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const layoutRef = useRef<Container<Layout>>(null);
    const { app } = useApplication();

    // give the canvas an alt text
    app.canvas.setAttribute('alt', 'pixi-canvas');
    void app.renderer.layout.enableDebug(true);

    useResize(() => {
        layoutRef.current?.children[0]!.resize?.(window.innerWidth, window.innerHeight);
    });

    return <pixiContainer ref={layoutRef}>{children}</pixiContainer>;
};

export const ReactStory: React.FC<ReactStoryProps> = ({ children, assets }) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const start = async () => {
            assets ??= [];
            const parsedAssets = assets.map((asset) => {
                if (asset.startsWith('fake:')) {
                    return {
                        alias: asset,
                        src: asset.replace('fake:', 'https://fakeimg.pl/'),
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
};
