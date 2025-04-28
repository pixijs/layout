import { Assets, type Sprite, type Texture } from 'pixi.js';
import React, { type FC } from 'react';
import { type AlignContent } from '../../../../src';
import { ReactStory } from '../../yoga/utils/reactStory';
import { useAnimation } from '../../yoga/utils/useAnimation';

import type { Meta, StoryObj } from '@storybook/react';

type Props = {
    alignContent: AlignContent;
};

const LayoutComponent: FC<Props> = () => {
    const texture = Assets.get<Texture>('/assets/bunny.png');
    const refs = useAnimation<Sprite>({ rotation: false, scale: false }, 5);

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 300,
                    height: 300,
                    padding: 10,
                    flexDirection: 'column',
                }}
            >
                <pixiTilingSprite
                    scale={0.5}
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', applySizeDirectly: true }}
                />
                <pixiTilingSprite
                    scale={0.5}
                    anchor={0.5}
                    texture={texture}
                    layout={{ width: '100%', height: '100%', applySizeDirectly: false }}
                />
                <node style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                    <pixiText
                        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
                        scale={0.5}
                        anchor={5}
                        style={{ fill: 0xffffff, wordWrap: true }}
                        layout={{
                            applySizeDirectly: true,
                            width: '100%',
                            height: '100%',
                            objectFit: 'scale-down',
                        }}
                    />
                    <pixiSprite
                        ref={refs.r1}
                        // you cant apply scale to a sprite and use applySizeDirectly
                        scale={0.5}
                        anchor={0.5}
                        texture={texture}
                        layout={{
                            width: '100%',
                            height: '100%',
                            applySizeDirectly: true,
                            objectFit: 'fill',
                        }}
                    />
                </node>
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Apply Size',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const Default: Story = {
    args: {},
};
