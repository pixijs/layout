import { Assets, type Texture } from 'pixi.js';
import React, { type FC } from 'react';
import { type LayoutStyles } from '../../../../src/core/style/layoutStyles';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = object;

const FancyButton = ({ layout }: { layout: LayoutStyles }) => {
    const texture = Assets.get<Texture>('/assets/square.png');

    return (
        <pixiContainer layout={layout}>
            <pixiSprite anchor={0.5} texture={texture} />
        </pixiContainer>
    );
};

const LayoutComponent: FC<Props> = () => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    padding: 10,
                }}
            >
                <FancyButton
                    layout={{ isLeaf: true, width: '100%', height: '50', objectFit: 'contain', objectPosition: 'left' }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Container Leaf',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/square.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Default: Story = {
    args: {},
};
