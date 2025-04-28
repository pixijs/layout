import { Assets, type TilingSpriteOptions } from 'pixi.js';
import React, { type FC } from 'react';
import { type PositionSpecifier } from '../../../../src/core/types';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    objectPosition: PositionSpecifier;
};

const PositionNode: FC<Props> = ({ objectPosition }) => {
    const props: Omit<TilingSpriteOptions, 'children'> = {
        texture: Assets.get('/assets/rounded-rectangle.png'),
        tileScale: { x: 0.1, y: 0.1 },
    };

    return (
        <node style={{ width: 60, height: 60, flexDirection: 'column', alignContent: 'flex-start' }}>
            <pixiTilingSprite
                anchor={0.5}
                {...props}
                layout={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                    objectPosition,
                    position: 'absolute',
                }}
            />
        </node>
    );
};

type StoryProps = {
    objectPositions: PositionSpecifier[];
};
const LayoutComponent: FC<StoryProps> = ({ objectPositions }) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                {/* loop through object positions and make a postion node */}
                {objectPositions.map((objectPosition, index) => (
                    <PositionNode key={index} objectPosition={objectPosition} />
                ))}
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Object Position/Fill Tiling',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png', '/assets/rounded-rectangle.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const SingleValue: Story = {
    args: {
        objectPositions: ['top', 'bottom', 'left', 'right', 'center', '50%', 60 / 2],
    },
};

export const DoubleValue: Story = {
    args: {
        objectPositions: ['top left', 'top right', 'bottom left', 'bottom right'],
    },
};

export const CenterValues: Story = {
    args: {
        objectPositions: [
            'top center',
            'center top',
            'bottom center',
            'center bottom',
            'left center',
            'center left',
            'right center',
            'center right',
            'center center',
        ],
    },
};

export const CustomValues: Story = {
    args: {
        objectPositions: [
            '10% 10%',
            '20% 20%',
            '30% 30%',
            '40% 40%',
            '50% 50%',
            '60% 60%',
            '70% 70%',
            '80% 80%',
            '90% 90%',
            '100% 100%',
        ],
    },
};

export const MixedValues: Story = {
    args: {
        objectPositions: ['50% 50%', '5 50%', '50% 20'],
    },
};

export const MixedKeywordsPercentages: Story = {
    args: {
        objectPositions: [
            'top 50%',
            '50% top',
            '50% right',
            'right 50%',
            '50% bottom',
            'bottom 50%',
            'left 50%',
            '50% left',
        ],
    },
};
