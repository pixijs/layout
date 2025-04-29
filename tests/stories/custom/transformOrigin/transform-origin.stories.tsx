import React from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    return (
        <layout config={{ useWebDefaults: false }}>
            <node style={{ width: 200, height: 200, padding: 10, flexDirection: 'column' }}>
                <node rotation={Math.PI / 4} style={{ width: 60, height: 60, margin: 'auto', transformOrigin: 30 }} />
                <node
                    rotation={Math.PI / 4}
                    style={{
                        width: 60,
                        height: 60,
                        margin: 'auto',
                        transformOrigin: '50% 50%',
                    }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Transform Origin',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Container: Story = {
    args: {},
};
