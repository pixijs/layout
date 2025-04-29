---
hide_title: true
title: Tailwind
sidebar_position: 2
---

## Tailwind

For users who are used to working with Tailwind CSS, we have a special helper that allows you to use Tailwind-style classes directly in your PixiJS layout definitions and translates them into a proper layout object automatically. This makes it easier for developers who are already familiar with Tailwind to work with PixiJS layouts without having to learn a new syntax.

:::warning

> This utility is currently **experimental** and **does not yet support all Tailwind classes**. If you're missing a specific utility, feel free to open a feature request or contribute!
:::

## ✨ What It Does

The helper converts a string of Tailwind-style classes into a `layout` object compatible with `@pixi/layout`.

For example:

```ts
const layout = tw`flex flex-col items-center justify-center w-full h-full`;
```

This gets translated into something like:

```ts
{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
}
```

## 🚀 Usage

Import the helper and use it when constructing any layout-enabled container or view:

```ts
import { Container } from 'pixi.js';
import { tw } from '@pixi/layout/tailwind';

const container = new Container({
    layout: tw`flex flex-col items-center justify-center w-full h-full`;
});
```

You can now add this container to your PixiJS stage, and it will behave as expected according to the layout system.

## 🧠 Tips

- You can use **template literals** to compose dynamic layouts:

    ```ts
    const layout = tw`flex \${isVertical ? 'flex-col' : 'flex-row'} gap-4`;
    ```