import { Text } from 'pixi.js';
import React, { useEffect } from 'react';
import { LayoutContainer } from '../../../src/components';
import { type Node } from '../playground/Node';
import { ReactStory } from '../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    const layourRef = React.useRef<Node>(null);

    useEffect(() => {
        let raf = 0;

        // The pixi reconciler commits asynchronously, so the ref can still be null when
        // this effect runs; retry until the node is attached instead of giving up
        // (an early return here intermittently left the child out of the scene).
        const attach = () => {
            const layout = layourRef.current;

            if (!layout) {
                raf = requestAnimationFrame(attach);

                return;
            }
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
        };

        attach();

        return () => cancelAnimationFrame(raf);
    }, []);

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
