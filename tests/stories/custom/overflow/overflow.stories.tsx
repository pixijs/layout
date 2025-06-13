import { Assets, type Sprite } from 'pixi.js';
import React from 'react';
import { ReactStory } from '../../yoga/utils/reactStory';
import { useAnimation } from '../../yoga/utils/useAnimation';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    const refs = useAnimation<Sprite>({ rotation: false, scale: false }, 5);

    return (
        <layout config={{ useWebDefaults: false }}>
            <layoutContainer
                trackpad={{ yConstrainPercent: 0, maxSpeed: 4 }}
                layout={{
                    width: 300,
                    height: 300,
                    flexDirection: 'column',
                    overflow: 'scroll',
                    backgroundColor: 0x000000,
                    borderColor: 0xff0000,
                    borderWidth: 5,
                    borderRadius: 8,
                }}
            >
                {/* Should rotate and scale from the center of the debug box, with an offset scale of 2 */}
                <pixiSprite
                    ref={refs.r1}
                    tint={0x00ff00}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    label="r1"
                    layout={{
                        width: '200',
                        height: '400',
                        minHeight: 400,
                        // debug: true,
                        transformOrigin: '50%',
                        objectFit: 'fill',
                        objectPosition: 'center',
                    }}
                />
                <pixiSprite
                    ref={refs.r2}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    layout={{
                        width: '200',
                        height: '400',
                        minHeight: 400,
                        // debug: true,
                        transformOrigin: '50%',
                        objectFit: 'fill',
                        objectPosition: 'center',
                    }}
                />
            </layoutContainer>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Overflow',
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
    args: {},
};
