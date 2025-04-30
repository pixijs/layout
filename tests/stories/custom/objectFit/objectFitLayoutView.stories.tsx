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
    const defaults = {
        backgroundColor: `#1e293b`,
        borderWidth: 1,
        borderColor: `#fff`,
    };

    return (
        <layout config={{ useWebDefaults: false }}>
            <layoutContainer
                layout={{
                    ...defaults,
                    backgroundColor: `#0f172a`,
                    width: 300,
                    height: 300,
                    padding: 10,
                }}
            >
                <layoutSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{ ...defaults, width: '50%', height: '100%', objectFit: 'fill' }}
                />
                <layoutSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{
                        ...defaults,
                        width: '50%',
                        height: '100%',
                        objectFit: 'scale-down',
                    }}
                />
            </layoutContainer>
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

export const LayoutView: Story = {
    args: {},
};
