---
title: Flexbox Styles
hide_title: true
sidebar_position: 2
---

## Flexbox Styles

Flexbox controls how child elements are arranged inside a container.  
It defines the main axis, wrapping behavior, and alignment of children relative to each other.

The PixiJS Layout system uses Yoga which implements the CSS Flexbox specification, which means you can use familiar properties and values.

---

## Flex Direction

The `flexDirection` property defines the **main axis** of a container and determines how children are laid out. The **main axis** is the direction children are laid out. The **cross axis** is perpendicular to the main axis (used for alignment and wrapping).

If wrapping is enabled:

- In `row` direction, wrapped lines move downward.
- In `column` direction, wrapped lines move to the right.

| Value            | Description                                        |
| ---------------- | -------------------------------------------------- |
| `row`            | Children are laid out horizontally, left to right. |
| `row-reverse`    | Children are laid out horizontally, right to left. |
| `column`         | Children are laid out vertically, top to bottom.   |
| `column-reverse` | Children are laid out vertically, bottom to top.   |

```ts
container.layout = {
    flexDirection: 'row',
};
```

---

## Flex Grow, Shrink, and Basis

Each child inside a flex container can control how it grows and shrinks relative to its siblings.

| Property     | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `flexGrow`   | Controls how much the item should expand to fill **remaining positive space**.    |
| `flexShrink` | Controls how much the item should shrink if there is **negative overflow space**. |
| `flexBasis`  | Sets the **default size along the main axis** before growing or shrinking.        |

### Flex Basis

`flexBasis` acts as the **starting size** along the main axis:

- If `flexDirection: 'row'`, flex basis behaves like `width`.
- If `flexDirection: 'column'`, flex basis behaves like `height`.
- Flex basis is the size used before any `flexGrow` or `flexShrink` adjustments.

```ts
child.layout = {
    flexBasis: 100, // 100px starting size
};
```

If omitted, it defaults to `'auto'`, meaning the size is based on content or `width`/`height`.

### Flex Grow

`flexGrow` controls how a child **expands to fill remaining space**:

- Accepts any float >= 0 (default 0).
- Remaining space is distributed proportionally among items based on their `flexGrow` values.

```ts
child1.layout = { flexGrow: 1 };
child2.layout = { flexGrow: 2 }; // Here, `child2` will grow twice as much as `child1`.
```

### Flex Shrink

`flexShrink` controls how a child **shrinks when necessary**:

- Accepts any float >= 0 (default 1).
- Shrinking happens when total child size exceeds container size.

```ts
child.layout = {
    flexShrink: 1,
};
```

A value of `0` disables shrinking for that child.

---

## Flex Wrapping

By default, children are laid out on a single line.  
You can control wrapping behavior using `flexWrap`.

If wrapping is enabled:

- In `row` direction, lines stack vertically.
- In `column` direction, lines stack horizontally.

| Value          | Description                                      |
| -------------- | ------------------------------------------------ |
| `nowrap`       | (default) Children stay on one line. May shrink. |
| `wrap`         | Children wrap onto multiple lines if needed.     |
| `wrap-reverse` | Like wrap, but lines are reversed.               |

```ts
container.layout = {
    flexWrap: 'wrap',
};
```

---

## Gap, Row Gap, and Column Gap

The `gap` property defines the spacing **between adjacent children** inside a flex container.  
It does not add space at the start or end of the container — only between children.

There are three related properties:

| Property    | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `gap`       | Sets both row and column spacing.                           |
| `rowGap`    | Sets vertical spacing between rows (when wrapping).         |
| `columnGap` | Sets horizontal spacing between columns or items in a line. |

If you set `gap`, it automatically applies to both `rowGap` and `columnGap`.  
You can also set `rowGap` and `columnGap` individually for finer control.

```ts
container.layout = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
};
```

You can override only one axis:

```ts
container.layout = {
    rowGap: 10,
    columnGap: 30,
};
```

---

## Aligning Items

These properties control how items are aligned along the main or cross axes.

| Property         | Controls alignment of...  | Values                                                                              | Description                                  |
| ---------------- | ------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------- |
| `justifyContent` | Children along main axis  | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` | Main axis alignment.                         |
| `alignItems`     | Children along cross axis | `flex-start`, `center`, `flex-end`, `stretch`, `baseline`                           | Cross axis alignment.                        |
| `alignContent`   | Lines when wrapping       | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `stretch`      | Cross axis alignment for multiple lines.     |
| `alignSelf`      | Individual child override | `flex-start`, `center`, `flex-end`, `stretch`, `baseline`                           | Per-child override for cross-axis alignment. |

### Justify Content

Controls alignment along the main axis.

| Value           | Description                 |
| --------------- | --------------------------- |
| `flex-start`    | Pack items at the start.    |
| `center`        | Center items.               |
| `flex-end`      | Pack items at the end.      |
| `space-between` | Even spacing between items. |
| `space-around`  | Even spacing around items.  |
| `space-evenly`  | Equal spacing everywhere.   |

```ts
container.layout = {
    justifyContent: 'center',
};
```

### Align Items

Controls cross-axis alignment for all children.

| Value        | Description                                 |
| ------------ | ------------------------------------------- |
| `flex-start` | Align items to the start of the cross axis. |
| `center`     | Center items along the cross axis.          |
| `flex-end`   | Align items to the end of the cross axis.   |
| `stretch`    | Stretch items to fill the cross axis.       |
| `baseline`   | Align items based on their baselines.       |

```ts
container.layout = {
    alignItems: 'stretch',
};
```

### Align Self

Align self has the same options and effect as align items but instead of affecting the children within a container, you can apply this property to a single child to change its alignment within its parent. Overrides `alignItems` **per individual child**.

```ts
child.layout = {
    alignSelf: 'flex-end',
};
```

### Align Content

Controls alignment of **lines** (when flexWrap is used).

- Affects how multiple lines are spaced along the cross axis.
- Has no effect unless wrapping is enabled.

| Value           | Description                                |
| --------------- | ------------------------------------------ |
| `flex-start`    | Pack lines at the start of the cross axis. |
| `center`        | Center lines along the cross axis.         |
| `flex-end`      | Pack lines at the end of the cross axis.   |
| `space-between` | Even spacing between lines.                |
| `space-around`  | Even spacing around lines.                 |
| `stretch`       | Stretch lines to fill the cross axis.      |
| `space-evenly`  | Equal spacing everywhere.                  |

```ts
container.layout = {
    alignContent: 'space-around',
};
```
