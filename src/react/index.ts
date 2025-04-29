import type { PixiReactElementProps } from '@pixi/react';

declare module '@pixi/react' {
    interface PixiElements {
        layoutContainer: PixiReactElementProps<typeof import('../components/LayoutContainer').LayoutContainer>;
        layoutView: PixiReactElementProps<typeof import('../components/LayoutView').LayoutView>;
        layoutSprite: PixiReactElementProps<typeof import('../components/pixi/sprite').LayoutSprite>;
        layoutNineSliceSprite: PixiReactElementProps<typeof import('../components/pixi/sprite').LayoutNineSliceSprite>;
        layoutTilingSprite: PixiReactElementProps<typeof import('../components/pixi/sprite').LayoutTilingSprite>;
        layoutAnimatedSprite: PixiReactElementProps<typeof import('../components/pixi/sprite').LayoutAnimatedSprite>;
        layoutGifSprite: PixiReactElementProps<typeof import('../components/pixi/gif').LayoutGifSprite>;
        layoutGraphics: PixiReactElementProps<typeof import('../components/pixi/graphics').LayoutGraphics>;
        layoutMesh: PixiReactElementProps<typeof import('../components/pixi/mesh').LayoutMesh>;
        layoutPerspectiveMesh: PixiReactElementProps<typeof import('../components/pixi/mesh').LayoutPerspectiveMesh>;
        layoutMeshPlane: PixiReactElementProps<typeof import('../components/pixi/mesh').LayoutMeshPlane>;
        layoutMeshRope: PixiReactElementProps<typeof import('../components/pixi/mesh').LayoutMeshRope>;
        layoutMeshSimple: PixiReactElementProps<typeof import('../components/pixi/mesh').LayoutMeshSimple>;
        layoutText: PixiReactElementProps<typeof import('../components/pixi/text').LayoutText>;
        layoutBitmapText: PixiReactElementProps<typeof import('../components/pixi/text').LayoutBitmapText>;
        layoutHTMLText: PixiReactElementProps<typeof import('../components/pixi/text').LayoutHTMLText>;
    }
}
