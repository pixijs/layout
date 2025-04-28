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
                    flexDirection: 'column',
                    alignContent: 'flex-start',
                }}
            >
                <node
                    style={{
                        margin: 5,
                        height: 50,
                        top: 20,
                        position: 'relative',
                    }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Position',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Position: Story = {
    args: {
        // 👇 The args you need here will depend on your component
    },
};
