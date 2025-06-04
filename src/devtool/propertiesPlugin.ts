import { type LayoutStyles } from '../core/style/layoutStyles';

import type { Container } from 'pixi.js';
import type { Properties, PropertiesEntry, PropertiesExtension } from '@pixi/devtools';

function updateNodeFlex(props: Partial<LayoutStyles>, node: Container) {
    node.layout = props;
}

function createPropertyEntry(propBase: string, label: string, section: string): Properties {
    return {
        prop: `layoutStyle.${propBase}`,
        entry: { type: 'text', label, section },
    };
}

const properties = () =>
    [
        {
            prop: 'layoutStyle._computedBounds',
            entry: {
                label: 'Computed Bounds',
                section: 'Layout',
                options: {
                    inputs: [
                        { disabled: true, label: 'left' },
                        { disabled: true, label: 'top' },
                        { disabled: true, label: 'width' },
                        { disabled: true, label: 'height' },
                    ],
                },
                type: 'vectorX',
            },
        },
        // {
        //     prop: 'layoutStyle._computedOverrides',
        //     entry: {
        //         label: 'Computed Overrides',
        //         section: 'Layout',
        //         options: {
        //             inputs: [
        //                 { disabled: true, label: 'x' },
        //                 { disabled: true, label: 'y' },
        //                 { disabled: true, label: 'ox' },
        //                 { disabled: true, label: 'oy' },
        //                 { disabled: true, label: 'sx' },
        //                 { disabled: true, label: 'sy' },
        //                 { disabled: true, label: 'origX' },
        //                 { disabled: true, label: 'origY' },
        //             ],
        //         },
        //         type: 'vectorX',
        //     },
        // },
        createPropertyEntry('width', 'Width', 'Layout'),
        createPropertyEntry('height', 'Height', 'Layout'),
        createPropertyEntry('minWidth', 'Min Width', 'Layout'),
        createPropertyEntry('maxWidth', 'Max Width', 'Layout'),
        createPropertyEntry('minHeight', 'Min Height', 'Layout'),
        createPropertyEntry('maxHeight', 'Max Height', 'Layout'),
        createPropertyEntry('aspectRatio', 'Aspect Ratio', 'Layout'),

        createPropertyEntry('padding', 'Padding', 'Layout'),
        createPropertyEntry('paddingRight', 'Padding Right', 'Layout'),
        createPropertyEntry('paddingTop', 'Padding Top', 'Layout'),
        createPropertyEntry('paddingBottom', 'Padding Bottom', 'Layout'),
        createPropertyEntry('paddingLeft', 'Padding Left', 'Layout'),

        createPropertyEntry('margin', 'Margin', 'Layout'),
        createPropertyEntry('marginTop', 'Margin Top', 'Layout'),
        createPropertyEntry('marginRight', 'Margin Right', 'Layout'),
        createPropertyEntry('marginBottom', 'Margin Bottom', 'Layout'),
        createPropertyEntry('marginLeft', 'Margin Left', 'Layout'),

        {
            prop: 'layoutStyle.position',
            entry: {
                label: 'Position',
                section: 'Layout',
                type: 'select',
                options: { options: ['relative', 'absolute'] },
            },
        },
        createPropertyEntry('top', 'Top', 'Layout'),
        createPropertyEntry('right', 'Right', 'Layout'),
        createPropertyEntry('bottom', 'Bottom', 'Layout'),
        createPropertyEntry('left', 'Left', 'Layout'),

        createPropertyEntry('border', 'Border Width', 'Layout'),
        createPropertyEntry('borderTop', 'Border Top', 'Layout'),
        createPropertyEntry('borderRight', 'Border Right', 'Layout'),
        createPropertyEntry('borderBottom', 'Border Bottom', 'Layout'),
        createPropertyEntry('borderLeft', 'Border Left', 'Layout'),
        createPropertyEntry('borderRadius', 'Border Radius', 'Layout'),
        {
            prop: 'layoutStyle.borderColor',
            entry: { label: 'Border Color', section: 'Layout', type: 'color' },
        },

        {
            prop: 'layoutStyle.alignContent',
            entry: {
                label: 'alignContent',
                section: 'Layout',
                type: 'select',
                options: {
                    options: [
                        'flex-start',
                        'flex-end',
                        'center',
                        'space-between',
                        'space-around',
                        'stretch',
                        'auto',
                        'baseline',
                    ],
                },
            },
        },
        {
            prop: 'layoutStyle.alignItems',
            entry: {
                label: 'alignItems',
                section: 'Layout',
                type: 'select',
                options: {
                    options: [
                        'flex-start',
                        'flex-end',
                        'center',
                        'space-between',
                        'space-around',
                        'stretch',
                        'auto',
                        'baseline',
                    ],
                },
            },
        },
        {
            prop: 'layoutStyle.alignSelf',
            entry: {
                label: 'alignSelf',
                section: 'Layout',
                type: 'select',
                options: {
                    options: [
                        'flex-start',
                        'flex-end',
                        'center',
                        'space-between',
                        'space-around',
                        'stretch',
                        'auto',
                        'baseline',
                    ],
                },
            },
        },
        {
            prop: 'layoutStyle.justifyContent',
            entry: {
                label: 'justifyContent',
                section: 'Layout',
                type: 'select',
                options: {
                    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
                },
            },
        },

        {
            prop: 'layoutStyle.flexDirection',
            entry: {
                label: 'Flex Direction',
                section: 'Layout',
                type: 'select',
                options: { options: ['row', 'row-reverse', 'column', 'column-reverse'] },
            },
        },
        createPropertyEntry('flex', 'flex', 'Layout'),
        createPropertyEntry('flexBasis', 'Flex Basis', 'Layout'),
        createPropertyEntry('flexGrow', 'Flex Grow', 'Layout'),
        createPropertyEntry('flexShrink', 'Flex Shrink', 'Layout'),
        {
            prop: 'layoutStyle.wrap',
            entry: {
                label: 'Flex Wrap',
                section: 'Layout',
                type: 'select',
                options: { options: ['no-wrap', 'wrap', 'wrap-reverse'] },
            },
        },

        createPropertyEntry('gap', 'Gap', 'Layout'),
        createPropertyEntry('rowGap', 'Row Gap', 'Layout'),
        createPropertyEntry('columnGap', 'Column Gap', 'Layout'),

        {
            prop: 'layoutStyle.overflow',
            entry: {
                label: 'Overflow',
                section: 'Layout',
                type: 'select',
                options: {
                    options: ['visible', 'hidden', 'scroll'],
                },
            },
        },
        {
            prop: 'layoutStyle.backgroundColor',
            entry: { label: 'Background Color', section: 'Layout', type: 'color' },
        },

        createPropertyEntry('transformOrigin', 'Transform Origin', 'Layout'),

        {
            prop: 'layoutStyle.objectFit',
            entry: {
                label: 'objectFit',
                section: 'Layout',
                type: 'select',
                options: {
                    options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                },
            },
        },
        { prop: 'layoutStyle.objectPosition', entry: { label: 'objectPosition', section: 'Layout', type: 'text' } },

        {
            prop: 'layoutStyle.applySizeDirectly',
            entry: { label: 'applySizeDirectly', section: 'Layout', type: 'boolean' },
        },
        { prop: 'layoutStyle.isLeaf', entry: { label: 'isLeaf', section: 'Layout', type: 'boolean' } },

        { prop: 'layoutStyle.debug', entry: { label: 'Debug', section: 'Layout', type: 'boolean' } },
        { prop: 'layoutStyle.debugHeat', entry: { label: 'Debug Heat', section: 'Layout', type: 'boolean' } },
        {
            prop: 'layoutStyle.debugDrawMargin',
            entry: { label: 'Debug Draw Margin', section: 'Layout', type: 'boolean' },
        },
        {
            prop: 'layoutStyle.debugDrawPadding',
            entry: { label: 'Debug Draw Padding', section: 'Layout', type: 'boolean' },
        },
        {
            prop: 'layoutStyle.debugDrawBorder',
            entry: { label: 'Debug Draw Border', section: 'Layout', type: 'boolean' },
        },
        { prop: 'layoutStyle.debugDrawFlex', entry: { label: 'Debug Draw Flex', section: 'Layout', type: 'boolean' } },
        {
            prop: 'layoutStyle.debugDrawContent',
            entry: { label: 'Debug Draw Content', section: 'Layout', type: 'boolean' },
        },

        {
            prop: 'layoutStyle._isDirty',
            entry: { label: 'Is Dirty', section: 'Layout', type: 'boolean', options: { disabled: true } },
        },
        {
            prop: 'layoutStyle._modificationCount',
            entry: { label: 'Modification Count', section: 'Layout', type: 'number', options: { disabled: true } },
        },
        {
            prop: 'layoutStyle.hasParent',
            entry: { label: 'Has Parent', section: 'Layout', type: 'boolean', options: { disabled: true } },
        },
    ] as Properties[];

export const propertiesPlugin: PropertiesExtension = {
    extension: {
        name: 'layout-scene-properties',
        type: 'sceneProperties',
        priority: 2,
    },
    testNode(container: Container): boolean {
        return !!container.layout;
    },
    testProp(prop: string): boolean {
        return prop.startsWith('layoutStyle.');
    },
    setProperty(container: Container, prop: string, value: any): void {
        const flexProp = prop.replace('layoutStyle.', '');

        updateNodeFlex({ [flexProp]: value }, container);
    },
    getProperties(container: Container): PropertiesEntry[] {
        const activeProps = properties().reduce((result, property) => {
            const _flex = container.layout!.style;
            const flexProp = property.prop.replace('layoutStyle.', '');
            const propertyClone = { ...property };

            let value: any = _flex[flexProp as keyof typeof _flex];

            if (flexProp === '_computedBounds') {
                const { left, top, width, height } = container.layout!._computedLayout;

                value = [left, top, width, height];
            } else if (flexProp === '_computedOverrides') {
                const { x, y, offsetX, offsetY, scaleX, scaleY, originX, originY } =
                    container.layout!._computedPixiLayout;

                value = [x, y, offsetX, offsetY, scaleX, scaleY, originX, originY];
            } else if (flexProp === '_isDirty') {
                value = container.layout!._isDirty;
            } else if (flexProp === 'hasParent') {
                value = container.layout!.hasParent;
            } else if (flexProp === '_modificationCount') {
                value = container.layout!._modificationCount;
            }

            result.push({ ...propertyClone, value });

            return result;
        }, [] as PropertiesEntry[]);

        return activeProps;
    },
};
