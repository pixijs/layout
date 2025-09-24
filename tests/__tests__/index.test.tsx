/* eslint-disable simple-import-sort/imports */
/* eslint-disable camelcase */
import { type Store_CSFExports, type StoriesWithPartialProps } from 'storybook/internal/types';
import { expect, test } from 'vitest';
import '../stories/yoga/utils/reactStory';
import { composeStories, type ReactRenderer } from '@storybook/react';
import { page, server } from '@vitest/browser/context';

/** START AUTO GENERATED IMPORTS */
import * as widthHeightStories from '../stories/yoga/width-height.stories';
import * as positionStories from '../stories/yoga/position.stories';
import * as minMaxWidthHeightStories from '../stories/yoga/min-max-width-height.stories';
import * as marginPaddingBorderStories from '../stories/yoga/margin-padding-border.stories';
import * as mainStories from '../stories/yoga/main.stories';
import * as layoutDirectionStories from '../stories/yoga/layout-direction.stories';
import * as justifyContentStories from '../stories/yoga/justify-content.stories';
import * as insetsStories from '../stories/yoga/insets.stories';
import * as gapStories from '../stories/yoga/gap.stories';
import * as flexWrapStories from '../stories/yoga/flex-wrap.stories';
import * as flexShrinkStories from '../stories/yoga/flex-shrink.stories';
import * as flexGrowStories from '../stories/yoga/flex-grow.stories';
import * as flexDirectionStories from '../stories/yoga/flex-direction.stories';
import * as flexBasisStories from '../stories/yoga/flex-basis.stories';
import * as displayStories from '../stories/yoga/display.stories';
import * as containingBlockStories from '../stories/yoga/containing-block.stories';
import * as aspectRatioStories from '../stories/yoga/aspect-ratio.stories';
import * as alignItemsStories from '../stories/yoga/align-items.stories';
import * as alignContentStories from '../stories/yoga/align-content.stories';
import * as gameTestsStories from '../stories/custom/game-tests.stories';
import * as childrenStories from '../stories/custom/children.stories';
import * as transformOriginStories from '../stories/custom/transformOrigin/transform-origin.stories';
import * as transformOriginLeafStories from '../stories/custom/transformOrigin/transform-origin-leaf.stories';
import * as pixiSizeMixStories from '../stories/custom/pixiSize/pixiSizeMix.stories';
import * as pixiSizeStories from '../stories/custom/pixiSize/pixiSize.stories';
import * as overflowStories from '../stories/custom/overflow/overflow.stories';
import * as objectPositionTilingFillStories from '../stories/custom/objectPosition/objectPositionTilingFill.stories';
import * as objectPositionSpriteScaleStories from '../stories/custom/objectPosition/objectPositionSpriteScale.stories';
import * as objectPositionSpriteFillStories from '../stories/custom/objectPosition/objectPositionSpriteFill.stories';
import * as objectPositionSpriteCoverStories from '../stories/custom/objectPosition/objectPositionSpriteCover.stories';
import * as objectPositionSpriteContainStories from '../stories/custom/objectPosition/objectPositionSpriteContain.stories';
import * as objectPositionNineSliceFillStories from '../stories/custom/objectPosition/objectPositionNineSliceFill.stories';
import * as objectFitTilingStories from '../stories/custom/objectFit/objectFitTiling.stories';
import * as objectFitTextStories from '../stories/custom/objectFit/objectFitText.stories';
import * as objectFitNineSliceStories from '../stories/custom/objectFit/objectFitNineSlice.stories';
import * as objectFitLayoutViewStories from '../stories/custom/objectFit/objectFitLayoutView.stories';
import * as objectFitStories from '../stories/custom/objectFit/objectFit.stories';
import * as isLeafStories from '../stories/custom/leaf/isLeaf.stories';
import * as dynamicTextStories from '../stories/custom/dynamicChanges/dynamicText.stories';
import * as dynamicDeleteStories from '../stories/custom/dynamicChanges/dynamicDelete.stories';
import * as layoutContainerBackgroundStories from '../stories/custom/components/layoutContainerBackground.stories';
import * as layoutContainerStories from '../stories/custom/components/layoutContainer.stories';
import * as applySizeStories from '../stories/custom/applySize/applySize.stories';
/** END AUTO GENERATED IMPORTS */

const allStories: Record<string, ReturnType<typeof composeStories>> = {};

/** START AUTO GENERATED STORIES */
allStories.widthHeightStories = composeStories(widthHeightStories);
allStories.positionStories = composeStories(positionStories);
allStories.minMaxWidthHeightStories = composeStories(minMaxWidthHeightStories);
allStories.marginPaddingBorderStories = composeStories(marginPaddingBorderStories);
allStories.mainStories = composeStories(mainStories);
allStories.layoutDirectionStories = composeStories(layoutDirectionStories);
allStories.justifyContentStories = composeStories(justifyContentStories);
allStories.insetsStories = composeStories(insetsStories);
allStories.gapStories = composeStories(gapStories);
allStories.flexWrapStories = composeStories(flexWrapStories);
allStories.flexShrinkStories = composeStories(flexShrinkStories);
allStories.flexGrowStories = composeStories(flexGrowStories);
allStories.flexDirectionStories = composeStories(flexDirectionStories);
allStories.flexBasisStories = composeStories(flexBasisStories);
allStories.displayStories = composeStories(displayStories);
allStories.containingBlockStories = composeStories(containingBlockStories);
allStories.aspectRatioStories = composeStories(aspectRatioStories);
allStories.alignItemsStories = composeStories(alignItemsStories);
allStories.alignContentStories = composeStories(alignContentStories);
allStories.gameTestsStories = composeStories(gameTestsStories);
allStories.childrenStories = composeStories(childrenStories);
allStories.transformOriginStories = composeStories(transformOriginStories);
allStories.transformOriginLeafStories = composeStories(transformOriginLeafStories);
allStories.pixiSizeMixStories = composeStories(pixiSizeMixStories);
allStories.pixiSizeStories = composeStories(pixiSizeStories);
allStories.overflowStories = composeStories(overflowStories);
allStories.objectPositionTilingFillStories = composeStories(objectPositionTilingFillStories);
allStories.objectPositionSpriteScaleStories = composeStories(objectPositionSpriteScaleStories);
allStories.objectPositionSpriteFillStories = composeStories(objectPositionSpriteFillStories);
allStories.objectPositionSpriteCoverStories = composeStories(objectPositionSpriteCoverStories);
allStories.objectPositionSpriteContainStories = composeStories(objectPositionSpriteContainStories);
allStories.objectPositionNineSliceFillStories = composeStories(objectPositionNineSliceFillStories);
allStories.objectFitTilingStories = composeStories(objectFitTilingStories);
allStories.objectFitTextStories = composeStories(objectFitTextStories);
allStories.objectFitNineSliceStories = composeStories(objectFitNineSliceStories);
allStories.objectFitLayoutViewStories = composeStories(objectFitLayoutViewStories);
allStories.objectFitStories = composeStories(objectFitStories);
allStories.isLeafStories = composeStories(isLeafStories);
allStories.dynamicTextStories = composeStories(dynamicTextStories);
allStories.dynamicDeleteStories = composeStories(dynamicDeleteStories);
allStories.layoutContainerBackgroundStories = composeStories(layoutContainerBackgroundStories);
allStories.layoutContainerStories = composeStories(layoutContainerStories);
allStories.applySizeStories = composeStories(applySizeStories);
/** END AUTO GENERATED STORIES */

Object.entries(allStories).forEach(([_key, compiledStory]) => {
    const typedStory = compiledStory as Omit<
        StoriesWithPartialProps<ReactRenderer, typeof allStories>,
        keyof Store_CSFExports
    >;

    Object.entries(typedStory).forEach(([_key, story]) => {
        test(story.id, async () => {
            if (story.tags?.includes('skip')) {
                return;
            }
            await story.run();

            const delayTag = story.tags?.find((tag) => tag.startsWith('delay'));
            const delay = delayTag ? parseInt(delayTag.split(':')[1]!, 10) : 0;

            if (delay > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }

            const screenshot = `./.temp/${story.id}-${server.browser}.png`;

            await page.screenshot({ path: screenshot, element: page.getByAltText('pixi-canvas') });
            const res = await server.commands.compareScreenshot(screenshot);

            await server.commands.removeFile(screenshot);
            if (res.diff > 0 && (story.args as any)?.pixelMatch) {
                expect(res.diff).toBeLessThan((story.args as any)?.pixelMatch);
            } else {
                expect(res.result).toBe(true);
            }
        });
    });
});
