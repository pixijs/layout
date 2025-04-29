import { Assets, Sprite, type Texture } from 'pixi.js';
import React, { type FC } from 'react';
import { type LayoutView } from '../../../../src/components';
import { ReactStory } from '../../yoga/utils/reactStory';

import type { Meta, StoryObj } from '@storybook/react';

type Props = object;

const LayoutComponent: FC<Props> = () => {
    const ref = React.useRef<LayoutView>(null);
    const texture = Assets.get<Texture>('fake:50x50/40487a/ffffff');

    // force style update after first render
    setTimeout(() => {
        if (!ref.current) return;

        ref.current.rotation = 0.1;

        ref.current.layout = {
            width: '50%',
            height: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
        };
    }, 10);

    return (
        <layout config={{ useWebDefaults: false }}>
            <node layout={{ width: 300, height: 300, padding: 10, borderColor: 0xff0000, borderWidth: 1 }}>
                <layoutView
                    ref={ref}
                    layout={{
                        width: '50%',
                        height: '50%',
                        borderColor: 'white',
                        borderWidth: 5,
                        objectFit: 'scale-down',
                        objectPosition: 'top left',
                    }}
                    slot={new Sprite({ texture, anchor: 0.5 })}
                ></layoutView>
            </node>
        </layout>
    );
};

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LayoutComponent> = {
    title: 'Yoga/Components',
    component: LayoutComponent,
    render: (args) => (
        <ReactStory assets={['/assets/bunny.png', 'fake:50x50/40487a/ffffff']}>
            <LayoutComponent {...args} />
        </ReactStory>
    ),
};

export default meta;
type Story = StoryObj<typeof LayoutComponent>;

export const View: Story = {
    args: {},
};
