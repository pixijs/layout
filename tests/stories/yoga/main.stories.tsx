import React from 'react';
import { ReactStory } from './utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node style={{ width: 250, height: 475, padding: 10, flexDirection: 'column', alignContent: 'flex-start' }}>
                <node style={{ flex: 1, rowGap: 10, flexDirection: 'column', alignContent: 'flex-start' }}>
                    <node style={{ height: 60 }} />
                    <node style={{ flex: 1, marginInline: 10 }} />
                    <node style={{ flex: 2, marginInline: 10 }} />
                    <node
                        style={{
                            position: 'absolute',
                            width: '100%',
                            bottom: 0,
                            height: 64,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}
                    >
                        <node style={{ height: 40, width: 40 }} />
                        <node style={{ height: 40, width: 40 }} />
                        <node style={{ height: 40, width: 40 }} />
                        <node style={{ height: 40, width: 40 }} />
                    </node>
                </node>
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Main',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Main: Story = {
    args: {
        // 👇 The args you need here will depend on your component
    },
};
