import fs from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

import type { Plugin } from 'vitest/config';
import type { BrowserCommand } from 'vitest/node';

const compareScreenshot: BrowserCommand<[imagePath: string]> = ({ testPath }, imagePath) => {
    // get the path to the image
    const imagePathResolved = path.resolve(path.dirname(testPath!), imagePath);
    const compareImage = path.resolve(process.cwd(), 'tests/snapshots', path.basename(imagePathResolved));

    // check if the compare image exists
    if (!fs.existsSync(compareImage)) {
        // copy the imagePathResolved to the compareImage
        fs.copyFileSync(imagePathResolved, compareImage);

        return { result: true, diff: 0 };
    }

    const img1 = PNG.sync.read(fs.readFileSync(imagePathResolved));
    const img2 = PNG.sync.read(fs.readFileSync(compareImage));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const res = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

    if (res > 0) {
        // eslint-disable-next-line no-console
        console.log(`Image ${path.basename(imagePathResolved)} has a diff of ${res} pixels`);

        const artifactsPath = path.resolve(process.cwd(), 'tests/.artifacts');

        // ensure the directory exists
        fs.mkdirSync(artifactsPath, { recursive: true });

        // write the diff image
        fs.writeFileSync(path.resolve(artifactsPath, path.basename(imagePathResolved)), PNG.sync.write(diff));
    }

    return { result: res === 0, diff: res };
};

export default function BrowserCommands(): Plugin {
    return {
        name: 'vitest:compare-screenshot',
        config() {
            return {
                test: {
                    browser: {
                        commands: {
                            compareScreenshot,
                        },
                    },
                },
            };
        },
    };
}

// if you are using TypeScript, you can augment the module
declare module '@vitest/browser/context' {
    interface BrowserCommands {
        compareScreenshot: (imagePath: string) => Promise<{ result: boolean; diff: number }>;
    }
}
