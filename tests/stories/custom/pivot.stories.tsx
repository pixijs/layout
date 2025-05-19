import { Assets } from 'pixi.js';
import React from 'react';
import { ReactStory } from '../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                }}
            >
                <pixiSprite
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    pivot={-25}
                    rotation={Math.PI / 4}
                    layout={{
                        position: 'absolute',
                        objectFit: 'none',
                        transformOrigin: 0,
                        objectPosition: 'center',
                        applySizeDirectly: true,
                        debug: true,
                    }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Pivot',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['fake:50x50/40487a/ffffff', 'fake:100x100/40487a/ffffff']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Container: Story = {
    tags: ['skip'],
    args: {},
};
