import { Assets, type NineSliceSpriteOptions } from 'pixi.js';
import React, { type FC } from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    wordWrap: boolean;
};

const LayoutComponent: FC<Props> = () => {
    const props: Omit<NineSliceSpriteOptions, 'children'> = {
        texture: Assets.get('/assets/rounded-rectangle.png'),
        topHeight: 34,
        bottomHeight: 34,
        leftWidth: 34,
        rightWidth: 34,
    };

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    padding: 10,
                    gap: 40,
                    flexDirection: 'column',
                }}
            >
                <pixiNineSliceSprite
                    anchor={0.5}
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
                <pixiNineSliceSprite
                    anchor={0.5}
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'fill' }}
                />
                <pixiNineSliceSprite
                    anchor={0.5}
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'contain' }}
                />
                <pixiNineSliceSprite
                    anchor={0.5}
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'cover' }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Object Fit',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/rounded-rectangle.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const NineSlice: Story = {
    args: {},
};
