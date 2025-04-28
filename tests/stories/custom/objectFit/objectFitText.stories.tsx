import React, { type FC } from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    wordWrap: boolean;
};

const LayoutComponent: FC<Props> = ({ wordWrap }) => {
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
                <pixiText
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
                <pixiText
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'fill' }}
                />
                <pixiText
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'contain' }}
                />
                <pixiText
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
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
        <ReactStory>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Text: Story = {
    args: {},
};

export const TextWrapped: Story = {
    args: {
        wordWrap: true,
    },
};
