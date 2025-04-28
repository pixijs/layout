import { Assets, type Sprite, type Texture } from 'pixi.js';
import React from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';
import { useAnimation } from '../../yoga/utils/useAnimation';

import type { Meta, StoryObj } from '@storybook/react';

const SetupNode = ({ width, height, children }: { children: React.ReactNode; width?: number; height?: number }) => {
    const empty = Assets.get<Texture>('/assets/square-empty.png');

    return (
        <layout config={{ useWebDefaults: false }}>
            <pixiContainer angle={45} layout={{ width, height, transformOrigin: '50%' }}>
                <pixiNineSliceSprite
                    texture={empty}
                    layout={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'fill' }}
                />
                {children}
            </pixiContainer>
        </layout>
    );
};

const LayoutComponent = (_args: any) => {
    const texture = Assets.get<Texture>('/assets/rounded-rectangle.png');
    const refs = useAnimation<Sprite>({ rotation: false, scale: false }, 5);

    return (
        <SetupNode width={300} height={300}>
            <pixiSprite
                texture={texture}
                scale={0.5}
                angle={45}
                anchor={1}
                pivot={100}
                // Since it's scaled down the texture will be smaller than the box
                layout={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'scale-down',
                    transformOrigin: '50%',
                }}
                ref={refs.r1}
            />
        </SetupNode>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Transform Origin',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/rounded-rectangle.png', '/assets/square-empty.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const LeafNode: Story = {
    args: {},
};
