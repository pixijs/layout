---
title: Containers and Leaf Nodes
hide_title: true
sidebar_position: 1
---

## Containers and Leaf Nodes

When layout is enabled on an object, it receives default styling based on its type.
In PixiJS you can generally think of it having two types of objects:

- **Containers**: Objects that can contain other objects, including other containers and leaf nodes.
- **Leaf Nodes**: Objects that **cannot** contain other objects,
    - `Sprite`, `Text`, `Graphics`, and `TilingSprite` are all examples of leaf nodes.

For the web developers, this is similar to the difference between a `<div>` and an `<img>` tag.
Containers can have children, while leaf nodes cannot.

There are two main differences between containers and leaf nodes:

- Containers can have children, while leaf nodes cannot.
- Leaf nodes can use `objectFit` and `objectPosition` properties to control how they are displayed within their layout box, while containers cannot.

The concept of leaf nodes is important to understand as it is referenced many times in the documentation.

### Containers As Leaf Nodes

In some cases, you may want a container to behave like a leaf node. For example, many libraries such as PixiJS UI use a `Container` as a wrapper for holding multiple elements together.

In this case, you can set the `isLeaf` property to `true` on the container. This will make it behave like a leaf node, ignoring its children for layout purposes.

```ts
const container = new Container();

container.layout = {
    isLeaf: true,
    objectFit: 'contain',
    objectPosition: 'center',
};
```

When a container is set to `isLeaf`, if the bounds of the container are negative, it will be pushed along to the origin (0,0) to ensure that the content doesn't leave the layout box.
