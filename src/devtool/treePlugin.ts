import type { Container } from 'pixi.js';
import type { PixiMetadata, TreeExtension } from '@pixi/devtools';

export interface DevtoolFlexContainer extends Container {
    __devtoolLayoutDefaults?: any;
}

function flashNode(node: Container) {
    const originalAlpha = node.alpha;
    // repeatedly set the alpha to 0.1 and 1.0 to flash the node but in intervals of 100ms
    let count = 0;
    const interval = setInterval(() => {
        if (count % 2 === 0) {
            node.alpha = 0.1;
        } else {
            node.alpha = 1.0;
        }
        count++;
        if (count === 6) {
            clearInterval(interval);
            node.alpha = originalAlpha;
        }
    }, 100);
}

export function hasDefaults(node: DevtoolFlexContainer) {
    return node?.__devtoolLayoutDefaults !== undefined;
}

function isDirty(node: DevtoolFlexContainer) {
    return (
        hasDefaults(node) && JSON.stringify(node.layout?.style ?? {}) !== JSON.stringify(node.__devtoolLayoutDefaults)
    );
}

export const treePlugin: TreeExtension = {
    extension: {
        name: 'layout-scene-tree',
        type: 'sceneTree',
    },
    onButtonPress(container: DevtoolFlexContainer, buttonAction) {
        if (buttonAction === 'flash') {
            flashNode(container);
        } else if (buttonAction === 'reset') {
            if (hasDefaults(container)) {
                container.layout = { ...container.__devtoolLayoutDefaults };
                container.__devtoolLayoutDefaults = undefined;
            }
        }
    },
    updateNodeMetadata(node: Container, metadata: PixiMetadata) {
        // add flash icon to the node
        metadata.buttons!.push({
            name: 'flash',
            icon: '⚡',
            type: 'button',
        });

        if (!node?.layout) {
            return metadata;
        }

        // add reset icon to the node
        metadata.buttons!.push({
            name: 'reset',
            icon: '↺',
            type: 'button',
        });

        const icon = '⬥';
        const dirty = isDirty(node) ? '*' : '';

        metadata.suffix = `${dirty} ${icon}`;

        return metadata;
    },
    onSelected(container: DevtoolFlexContainer) {
        if (!hasDefaults(container)) {
            container.__devtoolLayoutDefaults = { ...container.layout?.style };
        }
    },
};
