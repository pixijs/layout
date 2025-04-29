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
import '@pixi/layout/react';
import '@pixi/layout';
import { LayoutContainer } from '@pixi/layout/components';
import React, { useRef } from 'react';
import { Application, Container } from 'pixi.js';
import { extend, useApplication } from '@pixi/react';

extend({
    Container,
    LayoutContainer,
});

const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const layoutRef = useRef<Container>(null);
    const { app } = useApplication();

    app.renderer.on('resize', () => {
        layoutRef.current?.layout = {
            width: app.screen.width,
            height: app.screen.height,
        };
    });

    return (
        <pixiContainer ref={layoutRef} layout={{}}>
            {children}
        </pixiContainer>
    );
};

export const App: React.FC<ReactStoryProps> = () => {
    return (
        <Application resizeTo={window} background={'#1C1C1D'}>
            <LayoutResizer>
                <layoutContainer
                    layout={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2C2C2E' }}
                >
                    <layoutContainer layout={{ width: '80%', height: '80%', backgroundColor: '#FF3B30' }} />
                </layoutContainer>
            </LayoutResizer>
        </Application>
    );
};
```
