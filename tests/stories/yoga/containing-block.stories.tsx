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
                }}
            >
                <node
                    style={{
                        height: 100,
                        width: 100,
                        position: 'static',
                    }}
                >
                    <node
                        style={{
                            height: 25,
                            width: '50%',
                            bottom: 10,
                            position: 'absolute',
                        }}
                    />
                </node>
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Containing Block',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const ContainingBlock: Story = {
    args: {
        // 👇 The args you need here will depend on your component
    },
};
