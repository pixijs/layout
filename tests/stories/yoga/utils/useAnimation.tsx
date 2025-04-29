import { type Container } from 'pixi.js';
import React from 'react';
import { useTick } from '@pixi/react';

type Refs<T> = Record<string, React.RefObject<T | null>>;

type AnimationConfig = {
    rotation?: boolean;
    scale?: boolean;
    scaleAmplitude?: number;
    scaleSpeed?: number;
    rotationSpeed?: number;
};

/**
 * Hook to animate multiple s with rotation and/or scaling
 * @param refs - Object containing  refs
 * @param config - Animation configuration
 */
export const useAnimation = <T extends Container>(config: AnimationConfig = {}, count = 3) => {
    let countRef = 0;
    const { rotation = false, scale = false, scaleAmplitude = 0.5, scaleSpeed = 0.1, rotationSpeed = 0.01 } = config;

    // create refs
    const refs: Refs<T> = {};

    for (let i = 0; i < count; i++) {
        refs[`r${i + 1}`] = React.createRef<T>();
    }

    useTick(() => {
        Object.values(refs).forEach((ref) => {
            if (!ref.current) return;

            if (rotation) {
                ref.current.rotation += rotationSpeed;
            }

            if (scale) {
                const scaleValue = 1 + Math.sin(countRef * scaleSpeed) * scaleAmplitude;

                ref.current.scale.set(scaleValue, scaleValue);
            }
        });

        countRef++;
    });

    return refs;
};
