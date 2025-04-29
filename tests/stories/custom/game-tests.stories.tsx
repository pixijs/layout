import { Assets, type Sprite } from 'pixi.js';
import React from 'react';
import { ReactStory } from '../yoga/utils/reactStory';
import { useAnimation } from '../yoga/utils/useAnimation';

import type { Meta, StoryObj } from '@storybook/react';

const LayoutComponent = (_args: any) => {
    const refs = useAnimation<Sprite>({ rotation: false, scale: false }, 5);

    return (
        <layout config={{ useWebDefaults: false }}>
            <node
                style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                }}
            >
                {/* Should rotate and scale from the center of the debug box, with an offset scale of 2 */}
                <pixiSprite
                    ref={refs.r1}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    scale={1.5}
                    angle={45}
                    layout={{
                        position: 'absolute',
                        width: '100',
                        height: '100',
                        transformOrigin: '50%',
                        objectFit: 'none',
                        objectPosition: 'center',
                        top: -41,
                        left: -400,
                        debug: true,
                    }}
                />
                {/* should rotate and scale from the bottom left of the sprite */}
                <pixiSprite
                    ref={refs.r2}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    // scale={2}
                    // angle={45}
                    layout={{
                        position: 'absolute',
                        left: -200,
                        top: -20,
                        width: '50%',
                        height: '50%',
                        objectFit: 'scale-down',
                        transformOrigin: '50%',
                        objectPosition: 'top right',
                        debug: true,
                    }}
                />
                {/* should rotate and scale from the top left corner */}
                <pixiSprite
                    ref={refs.r3}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    layout={{
                        position: 'absolute',
                        left: -20,
                        top: 2,
                        width: '50%',
                        height: '50%',
                        objectFit: 'scale-down',
                        transformOrigin: '0',
                        objectPosition: 'top left',
                        debug: true,
                    }}
                />
                {/* should rotate and scale from the center of the debug box, with an offset scale of 0.5 */}
                <pixiSprite
                    ref={refs.r4}
                    texture={Assets.get('fake:100x100/40487a/ffffff')}
                    scale={0.5}
                    layout={{
                        position: 'absolute',
                        left: 200,
                        top: 20,
                        width: '50%',
                        height: '50%',
                        objectFit: 'scale-down',
                        transformOrigin: '50%',
                        objectPosition: 'center',
                        debug: true,
                    }}
                />
                {/* should rotate and scale from the center of the debug box, with an offset scale of 1.5 */}
                <pixiSprite
                    ref={refs.r5}
                    texture={Assets.get('fake:50x50/40487a/ffffff')}
                    scale={1.5}
                    layout={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        transformOrigin: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        top: 40,
                        left: 400,
                        debug: true,
                    }}
                />
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Game Tests',
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
    tags: ['skip'],
    args: {},
};
