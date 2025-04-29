import React, { type FC } from 'react';
import { type AlignContent } from '../../../src';
import { ReactStory } from './utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    alignContent: AlignContent;
};

const LayoutComponent: FC<Props> = ({ alignContent }) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 200,
                    height: 250,
                    padding: 10,
                    alignContent,
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                }}
            >
                <node style={{ margin: 5, height: 50, width: 50 }} />
                <node style={{ margin: 5, height: 50, width: 50 }} />
                <node style={{ margin: 5, height: 50, width: 50 }} />
                <node style={{ margin: 5, height: 50, width: 50 }} />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Align Content',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const FlexStart: Story = {
    args: {
        alignContent: 'flex-start',
    },
};

export const FlexEnd: Story = {
    args: {
        alignContent: 'flex-end',
    },
};

export const Center: Story = {
    args: {
        alignContent: 'center',
    },
};

export const Stretch: Story = {
    args: {
        alignContent: 'stretch',
    },
};

export const SpaceBetween: Story = {
    args: {
        alignContent: 'space-between',
    },
};

export const SpaceAround: Story = {
    args: {
        alignContent: 'space-around',
    },
};

export const SpaceEvenly: Story = {
    args: {
        alignContent: 'space-evenly',
    },
};
