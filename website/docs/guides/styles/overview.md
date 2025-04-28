---
title: Overview
hide_title: true
sidebar_position: 0
---

## Styling in PixiJS Layout

The PixiJS Layout library brings familiar CSS-like styling concepts to PixiJS applications.
Developers can control sizing, positioning, spacing, flex behavior, and visuals using a declarative style object.

This guide introduces the overall approach to styling in PixiJS Layout and prepares you for more detailed topics like sizing, flexbox, spacing, and overflow.

## How Styling Works

PixiJS Layout styles are applied using a simple JavaScript object.
These style objects are passed to display objects through the `layout` property:

```ts
sprite.layout = {
    width: 100,
    height: 100,
    margin: 10,
    objectFit: 'contain',
};
```

Styles can be:

- Assigned at creation time through constructor options
- Updated later by setting the `layout` property again.
- You do not need to provide a full style object each time; you can update only the properties you want to change.

```ts
const sprite = new Sprite({ texture, layout: true });
// Set styles after creation
sprite.layout = {
    flexGrow: 1,
    justifyContent: 'center',
};
```

Under the hood, PixiJS Layout uses a flexbox-based engine call Yoga to resolve sizing, positioning, and scaling, much like how HTML and CSS flex layouts behave.

## Familiar Concepts for Web Developers

If you have experience with web development, many PixiJS Layout properties will feel familiar, with similar names and behaviors to CSS properties.

| PixiJS Layout Style           | Similar to CSS property         |
| ----------------------------- | ------------------------------- |
| width, height                 | width, height                   |
| margin, padding               | margin, padding                 |
| flexGrow, flexShrink          | flex-grow, flex-shrink          |
| justifyContent, alignItems    | justify-content, align-items    |
| overflow                      | overflow                        |
| backgroundColor, borderRadius | background-color, border-radius |

You can see more details on the specific properties in the rest of this section.

## Containers and Leaf Nodes

When layout is enabled on an object, it receives default styling based on its type. 
In PixiJS you can generally think of two types of objects:

- **Containers**: These are objects that can contain other objects
- **Leaf nodes**: These are objects that do not contain other objects, like `Sprite` or `Text`.

For the web developers, this is similar to the difference between a `<div>` and an `<img>` tag.
Containers can have children, while leaf nodes cannot.

One of the core differences between containers and leaf nodes is that leaf nodes are able to use `objectFit` and `objectPosition` properties to control how they are displayed within their layout box.

### Containers As Leaf Nodes

In some cases, you may want a container to behave like a leaf node. For example, many libraries such as PixiJS UI use a container as a wrapper for holding multiple elements together.

In this case, you can set the `isLeaf` property to `true` on the container. This will make it behave like a leaf node, ignoring its children for layout purposes.

```ts
const container = new Container();

container.layout = {
    isLeaf: true,
    width: 100,
    height: 100,
    objectFit: 'contain',
    objectPosition: 'center',
};
```

## Applying and Updating Styles

When setting styles, PixiJS Layout will automatically trigger a layout recalculation:

```ts
sprite.layout = {
    width: 200,
    height: 150,
    objectFit: 'cover',
};
```

If you change properties that affect intrinsic sizes (like replacing a texture or changing text content), PixiJS Layout will detect this and update the layout during the next update pass.

**Tip:**
Use `forceUpdate()` if you manually trigger changes that PixiJS Layout might not detect automatically.

## Next Steps

In the following guides, we will cover specific style areas in more depth:

- [Sizing and Dimensions](./sizing-and-dimensions.md)
- [Flexbox Layout](./flexbox-layout.md)
- [Margins and Padding](./spacing-margins-padding.md)
- [Positioning](./positioning.md)
- [Overflow and Scrolling](./overflow-and-scrolling.md)
- [Object Fitting and Alignment](./object-fitting-alignment.md)
- [Background and Borders](./background-and-borders.md)
