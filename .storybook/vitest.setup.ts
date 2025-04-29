import { beforeAll } from 'vitest';
import * as previewAnnotations from './preview';
import { setProjectAnnotations } from '@storybook/react';

const annotations = setProjectAnnotations([previewAnnotations]);

// Run Storybook's beforeAll hook
beforeAll(annotations.beforeAll);
