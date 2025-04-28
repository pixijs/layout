import { Assets, type Texture } from 'pixi.js';
import React, { type FC } from 'react';
import { type AlignContent } from '../../../../src';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    alignContent: AlignContent;
};

const LayoutComponent: FC<Props> = () => {
    const texture = Assets.get<Texture>('/assets/bunny.png');

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
                <pixiSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'fill' }}
                />
                <pixiSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
                <pixiSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'contain' }}
                />
                <pixiSprite
                    anchor={0.5}
                    texture={texture}
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

export const Sprite: Story = {
    args: {},
};
