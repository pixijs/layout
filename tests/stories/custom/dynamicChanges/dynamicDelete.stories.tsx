import { type Text as PixiText } from 'pixi.js';
import React, { type FC } from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent: FC = ({}) => {
    const refs: Record<string, React.RefObject<PixiText | null>> = {};

    for (let i = 0; i < 4; i++) {
        refs[`r${i + 1}`] = React.createRef<PixiText>();
    }

    setTimeout(() => {
        Object.values(refs)[2]!.current?.removeFromParent();
    }, 100);

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
                <pixiText ref={refs.r1} text="[0]" style={{ fill: 0xffffff }} layout={true} />
                <pixiText ref={refs.r2} text="[1]" style={{ fill: 0xffffff }} layout={true} />
                <pixiText ref={refs.r3} text="[2]" style={{ fill: 0xffffff }} layout={true} />
                <pixiText ref={refs.r4} text="[3]" style={{ fill: 0xffffff }} layout={true} />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Dynamic Changes/Delete',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Delete: Story = {
    tags: ['delay:200'],
    args: {},
};
