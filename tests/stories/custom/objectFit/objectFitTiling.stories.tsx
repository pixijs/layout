import { Assets, type TilingSpriteOptions } from 'pixi.js';
import React, { type FC } from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    wordWrap: boolean;
};

const LayoutComponent: FC<Props> = () => {
    const props: Omit<TilingSpriteOptions, 'children'> = {
        texture: Assets.get('/assets/bunny.png'),
    };

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <pixiTilingSprite
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
                <pixiTilingSprite
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'fill' }}
                />
                <pixiTilingSprite
                    {...props}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'contain' }}
                />
                <pixiTilingSprite
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
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Tiling: Story = {
    args: {},
};
