import { type Text as PixiText } from 'pixi.js';
import React, { type FC } from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    wordWrap: boolean;
};

const LayoutComponent: FC<Props> = ({ wordWrap }) => {
    const refs: Record<string, React.RefObject<PixiText | null>> = {};

    for (let i = 0; i < 4; i++) {
        refs[`r${i + 1}`] = React.createRef<PixiText>();
    }

    setTimeout(() => {
        Object.values(refs).forEach((ref) => {
            if (ref.current) {
                ref.current.text += ref.current.text;
            }
        });
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
                <pixiText
                    ref={refs.r1}
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap, fontSize: 20 }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
                <pixiText
                    ref={refs.r2}
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'fill' }}
                />
                <pixiText
                    ref={refs.r3}
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                    style={{ fill: 0xffffff, wordWrap }}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'contain' }}
                />
                <pixiText
                    ref={refs.r4}
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
    title: 'Yoga/Dynamic Changes/Text',
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
    tags: ['delay:200'],
    args: {},
};

export const TextWrapped: Story = {
    tags: ['delay:200'],
    args: {
        wordWrap: true,
    },
};
