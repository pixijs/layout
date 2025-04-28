---
hide_title: true
title: React
sidebar_position: 1
---

## Getting Started with React

PixiJS layout works seamlessly with [`@pixi/react`](https://github.com/pixijs/react-pixi). Here's how to integrate it into your React project.

### ✅ Requirements

- React 19
- `pixi.js`, `@pixi/react`, and `@pixi/layout`

Install them via npm:

```bash
npm install pixi.js @pixi/react @pixi/layout
```

## 🔧 Typescript Support

For TypeScript users, enable global layout typings by importing:

```ts
import '@pixi/layout/react';
```

This adds all components directly into the global JSX namespace.

## ⚛️ Example

Below is a minimal React setup using `@pixi/react` and the layout library. This example demonstrates how to create a responsive layout that adjusts to the window size.

```tsx
import { Application, Container } from 'pixi.js';
import { extend } from '@pixi/react';

extend({
    Container,
});

const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const layoutRef = useRef<Container>(null);

    useResize(() => {
        layoutRef.current?.layout = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    });

    return (
        <pixiContainer ref={layoutRef} layout={{}}>
            {children}
        </pixiContainer>
    );
};

export const ReactStory: React.FC<ReactStoryProps> = () => {
    return (
        <Application resizeTo={window} background={'#1C1C1D'}>
            <LayoutResizer>
                <LayoutContainer
                    layout={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#2C2C2E',
                    }}
                >
                    <pixiText layout={true} text='Hello, PixiJS!' style={{ fontSize: 24, fill: '#ffffff' }} />
                </LayoutContainer>
            </LayoutResizer>
        </Application>
    );
};
```
