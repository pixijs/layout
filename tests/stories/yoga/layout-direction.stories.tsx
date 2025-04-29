import React from 'react';
import { ReactStory } from './utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 200,
                    height: 200,
                    padding: 10,
                    direction: 'ltr',
                    flexDirection: 'column',
                }}
            >
                <node style={{ margin: 5, height: 50, width: 50 }} />
                <node style={{ margin: 5, height: 50, width: 50 }} />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Direction',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Direction: Story = {
    args: {
        // 👇 The args you need here will depend on your component
    },
};
