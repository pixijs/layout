import { Text } from 'pixi.js';
import React, { useEffect } from 'react';
import { useApplication } from '@pixi/react';
import { LayoutContainer } from '../../../src/components';
import { type Node } from '../playground/Node';
import { ReactStory } from '../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    const { app } = useApplication();
    const layourRef = React.useRef<Node>(null);

    useEffect(() => {
        if (!layourRef.current) {
            return;
        }
        const layout = layourRef.current;
        const text2 = new Text({
            text: 'layout',
            style: { fontSize: 48, fill: 'white' },
            layout: true as any,
        });

        const layoutChild = new LayoutContainer({
            layout: { borderWidth: 1, borderColor: 'white' },
            // broken
            children: [text2],
        });

        layout.addChild(layoutChild);
    }, [app]);

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                ref={layourRef}
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            ></node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Children',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['fake:50x50/40487a/ffffff', 'fake:100x100/40487a/ffffff']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Container: Story = {
    tags: ['delay:500'],
    args: {},
};
