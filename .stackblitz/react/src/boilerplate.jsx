import { Application, extend, useApplication } from '@pixi/react';
import { Assets } from 'pixi.js';

import { useEffect, useState } from 'react';

import {
    AnimatedSprite,
    Container,
    GifSprite,
    Graphics,
    LayoutAnimatedSprite,
    LayoutContainer,
    LayoutGifSprite,
    LayoutGraphics,
    LayoutMesh,
    LayoutMeshPlane,
    LayoutMeshRope,
    LayoutMeshSimple,
    LayoutNineSliceSprite,
    LayoutPerspectiveMesh,
    LayoutSprite,
    LayoutTilingSprite,
    Mesh,
    MeshPlane,
    MeshRope,
    MeshSimple,
    NineSliceSprite,
    PerspectiveMesh,
    Sprite,
    TilingSprite,
} from '@pixi/layout/components';

// extend tells @pixi/react what PixiJS components are available
extend({
    Container,
    GifSprite,
    Graphics,
    Mesh,
    PerspectiveMesh,
    MeshPlane,
    MeshRope,
    MeshSimple,
    Sprite,
    NineSliceSprite,
    TilingSprite,
    AnimatedSprite,
    LayoutContainer,
    LayoutGifSprite,
    LayoutGraphics,
    LayoutMesh,
    LayoutPerspectiveMesh,
    LayoutMeshPlane,
    LayoutMeshRope,
    LayoutMeshSimple,
    LayoutSprite,
    LayoutNineSliceSprite,
    LayoutTilingSprite,
    LayoutAnimatedSprite,
});

const LayoutResizer = ({ children }) => {
    const { app } = useApplication();

    app.stage.layout = {
        width: window.innerWidth,
        height: window.innerHeight,
        justifyContent: 'center',
        alignItems: 'center',
    };

    // listen for resize events on the renderer
    app.renderer.on('resize', () => {
        app.stage.layout = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });

    return children;
};

export default function App({ children, assets }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const start = async () => {
            assets ??= [];
            const parsedAssets = assets.map((asset) => {
                if (asset.startsWith('https://fakeimg.ryd.tools/')) {
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
