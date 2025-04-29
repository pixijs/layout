import { Assets, type Sprite, type Texture } from 'pixi.js';
import React, { type FC } from 'react';
import { useTick } from '@pixi/react';
import { type AlignContent } from '../../../../src';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    alignContent: AlignContent;
};

const LayoutComponent: FC<Props> = () => {
    const texture = Assets.get<Texture>('/assets/bunny.png');
    const spriteRef = React.useRef<Sprite>(null);

    const count = 1;

    useTick(() => {
        if (spriteRef.current) {
            // sine scale
            // count += 0.1;
            // spriteRef.current.scale.set(Math.sin(count) * 0.5 + 1);
        }
    });

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    padding: 10,
                    gap: 10,
                    flexDirection: 'column',
                }}
            >
                <pixiSprite
                    ref={spriteRef}
                    scale={Math.sin(count) * 0.5 + 1}
                    anchor={0.5}
                    texture={texture}
                    layout={{}}
                />
                <pixiSprite
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', objectPosition: 'top left', objectFit: 'scale-down' }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Pixi Size',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Dynamic: Story = {
    args: {},
};
