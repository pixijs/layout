// global.d.ts
import { type PixiReactElementProps } from '@pixi/react';
import { type LayoutStyles } from '../src/core/style/layoutStyles';
import { type Layout, type Node } from '../tests/stories/playground/Node';

declare module '@pixi/react' {
    interface PixiElements {
        layout: PixiReactElementProps<typeof Layout> & { config?: { useWebDefaults: boolean } };
        node: PixiReactElementProps<typeof Node> & { layout?: LayoutStyles; style?: LayoutStyles };
    }
}

/// <reference types="@vitest/browser/providers/playwright" />
