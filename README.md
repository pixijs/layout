<div align="center">
    <h1><img src="https://user-images.githubusercontent.com/11766115/228631922-d1d932c0-e5c9-4213-a719-69efaf34d4e7.png" />
</h1>
    <h3>It is a library for arranging/resizing pixi rendered elements basing on css like configs. It is made for simple and fast implementation of the responsive user interfaces in your games.</h3>
</div>

**We are now a part of the [Open Collective](https://opencollective.com/pixijs) and with your support you can help us make PixiJS even better. To make a donation, simply click the button below and we'll love you forever!**

Here are some useful resources:

-   [Full docs](https://pixijs.io/layout/)
-   [Github Repo](https://github.com/pixijs/layout)
-   [Sandbox](https://pixijs.io/layout/storybook)

## Compatibility

Depending on your version of PixiJS, you'll need to figure out which major version of PixiLayout to use.

| PixiJS      | PixiLayout     |
|-------------|----------------|
| v7.x        | v1.x           |
| v8.x        | v2.x           |

## Install

```sh
npm i @pixi/layout
```

## Usage

```js
import { Layout } from "@pixi/layout";

new Layout({
    content: {
        content: Sprite.from("bunny.png"),
        styles: {
            position: "center",
            maxWidth: "100%",
            minHeight: "100%",
        },
    },
    styles: {
        background: "red",
        position: "center",
        width: `100%`,
        height: `100%`,
    },
});
```

### Contribute

Want to be part of the PixiUI project? Great! All are welcome! We will get there quicker
together :) Whether you find a bug, have a great feature request, or you fancy owning a task
from the road map above, feel free to get in touch.

Make sure to read the [Contributing Guide](.github/CONTRIBUTING.md)
before submitting changes.

Also you can check the [Controllers influence schemas](.github/SCHEMAS.md)

### License

This content is released under the (http://opensource.org/licenses/MIT) MIT License.
