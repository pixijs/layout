---
title: Layout Transforms
hide_title: true
sidebar_position: 2
---

## Layout Transforms

PixiJS Layout introduces a new way to handle transforms that differs from the traditional PixiJS approach. This allows for a more familiar and consistent experience for web developers, especially those accustomed to CSS.

## Transform Origin

The `transformOrigin` property defines the **pivot point for rotation/scaling**, but applies to the **layout box**, not the PixiJS element. This property works for both containers and leaf nodes.

This is conceptually similar to transform-origin in CSS. Instead of modifying a sprite’s `anchor` or `pivot`, you should use `transformOrigin`.

```ts
sprite.layout = {
    width: 300,
    height: 300,
    transformOrigin: 'center',
};

sprite.rotation = 0.2; // rotates around center of the layout box
```

To avoid confusion, the `anchor` and `pivot` properties are not used in the context of layout. If a node has either of these properties set, they are ignored when calculating the layout box.

## Position and Scale Normalization

In PixiJS Layout, the `position` and `scale` properties of a node are always normalized to the layout box, not the position of the node within the parent container or the scale applied to the nodes content.

This means that when a node has layout enabled the following is true:

- `sprite.position.x` and `sprite.position.y` is always `0` by default even if the node is the third item in a flexbox.
- `sprite.scale.x` and `sprite.scale.y` is always `1` by default, regardless of properties like `objectFit` which may scale the content inside of the layout box.

The reason for this approach is that normalization simplifies transforms meaning you can animate the layout with ease.

```ts
const sprite = new Sprite({ texture });
sprite.layout = {
    width: 300,
    height: 300,
    objectFit: 'cover',
    transformOrigin: 'center',
};

sprite.scale = 2; // scales as if the box was 600x600
sprite.rotation = 0.2; // rotates around center of the layout box
```

It is possible to get the real position and scale of the node and the documentation for that is in the [Layout API](../layout.md#real-positionscale).

## Applying Size

In PixiJs Layout, when a node has layout enabled, we do not call `sprite.width` or `sprite.height` to set the size of the node. Instead, we apply any size changes directly to the local transform matrix of the node.

However, sometimes you may want to apply the size directly to the node as the setter for `width` and `height` might have been overridden.
This is done by setting the `applySizeDirectly` property to `true` on the layout object.

For example, many PixiJS UI components override the `width` and `height` setters to modify the size of the node. This means that you should set `applySizeDirectly` to `true` to ensure that component works as expected.

```ts
import { ProgressBar } from '@pixi/ui';

const progressBar = new ProgressBar({...});
progressBar.layout = {
    width: 300,
    height: 300,
    applySizeDirectly: true,
};
```

:::warning **Important**
If you set `applySizeDirectly` to `true` and the width/height setters adjust the scale of the node as well, you may end up with unexpected results.
:::
