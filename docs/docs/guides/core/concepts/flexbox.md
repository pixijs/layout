---
title: Flexbox Model
hide_title: true
sidebar_position: 0
---

## 📐 Yoga / Flexbox Model

PixiJS Layout is powered by [Yoga](https://www.yogalayout.dev/), a cross-platform layout engine that implements a subset of the CSS Flexbox specification. If you're familiar with how Flexbox works in HTML/CSS, you'll find many parallels in how layout rules work here.

For example, key properties such as `flexDirection`, `justifyContent`, `alignItems`, `gap`, and `flexWrap` work as expected and follow the same logic as in web development.

As a general rule, PixiJS Layout uses the same property names as CSS, however, the name is converted to camelCase. For example:

| PixiJS Layout property        | CSS property                    |
| ----------------------------- | ------------------------------- |
| marginLeft, marginRight       | margin-left, margin-right       |
| marginTop, marginBottom       | margin-top, margin-bottom       |
| paddingLeft, paddingRight     | padding-left, padding-right     |
| paddingTop, paddingBottom     | padding-top, padding-bottom     |
| flexGrow, flexShrink          | flex-grow, flex-shrink          |
| flexDirection, flexWrap       | flex-direction, flex-wrap       |
| justifyContent, alignItems    | justify-content, align-items    |
| alignContent, alignSelf       | align-content, align-self       |
| backgroundColor, borderRadius | background-color, border-radius |

---

## 🧱 Everything is a Box

In PixiJS Layout, **everything is conceptually a box**. This reflects the CSS box model:

- Containers represent layout groups, analogous to HTML `<div>` elements. They do not render visual content directly, but define layout regions that arrange and position children.

- Leaf nodes such as `Sprite`, `Graphics`, `Text`, `BitmapText`, and `TilingSprite` are analogous to HTML `<img>` elements. These nodes are visual and content-bearing.

Each node in the tree has a virtual layout box, and the position and size of that box is calculated by the layout engine. Visual elements can additionally scale or crop their internal content using style properties like `objectFit` and `objectPosition`.

```ts
const container = new Container({
    layout: {
        width: 500,
        height: 300,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

const sprite = new Sprite({ texture });
sprite.layout = {
    width: 100,
    height: 100,
    objectFit: 'contain',
    objectPosition: 'center',
};

container.addChild(sprite);
```
