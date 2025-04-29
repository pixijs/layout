import { overlayPlugin } from './overlayPlugin';
import { propertiesPlugin } from './propertiesPlugin';
import { treePlugin } from './treePlugin';

export * from './overlayPlugin';
export * from './propertiesPlugin';
export * from './treePlugin';

interface Devtools {
    __PIXI_DEVTOOLS__: {
        extensions: any[];
    };
}
const gThis = globalThis as unknown as Devtools;

// Add the plugins to the global devtools object
gThis.__PIXI_DEVTOOLS__ = {
    ...gThis.__PIXI_DEVTOOLS__,
    extensions: [...(gThis.__PIXI_DEVTOOLS__?.extensions ?? []), overlayPlugin, propertiesPlugin, treePlugin],
};
