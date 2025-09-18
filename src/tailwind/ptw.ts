import { type YogaStyles } from '../core/style/yogaStyles';

class TailwindParser {
    private static readonly BASE_UNIT = 4;

    private static readonly SPACING_MAP = {
        p: 'padding',
        px: ['paddingLeft', 'paddingRight'],
        py: ['paddingTop', 'paddingBottom'],
        pt: 'paddingTop',
        pr: 'paddingRight',
        pb: 'paddingBottom',
        pl: 'paddingLeft',
        m: 'margin',
        mx: ['marginLeft', 'marginRight'],
        my: ['marginTop', 'marginBottom'],
        mt: 'marginTop',
        mr: 'marginRight',
        mb: 'marginBottom',
        ml: 'marginLeft',

        gap: 'gap',
        'gap-x': 'columnGap',
        'gap-y': 'rowGap',
    };

    private static readonly DISPLAY_MAP = {
        // flex: { display: 'flex' },
        // block: { display: 'block' },
        // hidden: { display: 'none' },
    };

    private static readonly FLEX_MAP = {
        'flex-row': { flexDirection: 'row' },
        'flex-col': { flexDirection: 'column' },
        'flex-row-reverse': { flexDirection: 'row-reverse' },
        'flex-col-reverse': { flexDirection: 'column-reverse' },
        'flex-wrap': { flexWrap: 'wrap' },
        'flex-wrap-reverse': { flexWrap: 'wrap-reverse' },
        'flex-nowrap': { flexWrap: 'nowrap' },

        'grow-0': { flexGrow: 0 },
        grow: { flexGrow: 1 },

        'shrink-0': { flexShrink: 0 },
        shrink: { flexShrink: 1 },

        'justify-start': { justifyContent: 'flex-start' },
        'justify-center': { justifyContent: 'center' },
        'justify-end': { justifyContent: 'flex-end' },
        'justify-between': { justifyContent: 'space-between' },
        'justify-around': { justifyContent: 'space-around' },
        'justify-evenly': { justifyContent: 'space-evenly' },

        'items-start': { alignItems: 'flex-start' },
        'items-center': { alignItems: 'center' },
        'items-end': { alignItems: 'flex-end' },
        'items-baseline': { alignItems: 'baseline' },
        'items-stretch': { alignItems: 'stretch' },

        'content-start': { alignContent: 'flex-start' },
        'content-center': { alignContent: 'center' },
        'content-end': { alignContent: 'flex-end' },
        'content-between': { alignContent: 'space-between' },
        'content-around': { alignContent: 'space-around' },
        'content-evenly': { alignContent: 'space-evenly' },
        'content-stretch': { alignContent: 'stretch' },

        'self-auto': { alignSelf: 'auto' },
        'self-start': { alignSelf: 'flex-start' },
        'self-center': { alignSelf: 'center' },
        'self-end': { alignSelf: 'flex-end' },
        'self-stretch': { alignSelf: 'stretch' },
        'self-baseline': { alignSelf: 'baseline' },
    };

    private static readonly SIZE_MAP = {
        w: 'width',
        h: 'height',
        size: ['width', 'height'],
        'min-w': 'minWidth',
        'min-h': 'minHeight',
        'max-w': 'maxWidth',
        'max-h': 'maxHeight',
    };

    private static convertSizeValue(value: string): number | string {
        if (value === 'full') return '100%';
        if (value === 'screen') return '100vh';
        if (value === 'px') return 1;
        if (value === 'auto') return 'auto';
        if (value === '1/2') return '50%';
        if (value === '1/3') return '33.333333%';
        if (value === '2/3') return '66.666667%';
        if (value === '1/4') return '25%';
        if (value === '2/4') return '50%';
        if (value === '3/4') return '75%';
        if (value === '1/5') return '20%';
        if (value === '2/5') return '40%';
        if (value === '3/5') return '60%';
        if (value === '4/5') return '80%';

        return Number(value) * this.BASE_UNIT;
    }

    private static parseSize(key: keyof (typeof TailwindParser)['SIZE_MAP'], value: string, styles: YogaStyles): void {
        const property = this.SIZE_MAP[key] as keyof YogaStyles;
        const size = this.convertSizeValue(value);

        if (Array.isArray(property)) {
            property.forEach((prop) => (styles[prop as keyof YogaStyles] = size as any));
        } else if (property) {
            styles[property] = size as any;
        }
    }

    private static convertSpacingValue(value: string): number {
        if (value === 'px') return 1;

        return Number(value) * this.BASE_UNIT;
    }

    private static parseSpacing(
        key: keyof (typeof TailwindParser)['SPACING_MAP'],
        value: string,
        styles: YogaStyles,
    ): void {
        const property = this.SPACING_MAP[key] as keyof YogaStyles | (keyof YogaStyles)[];
        const spacing = this.convertSpacingValue(value);

        if (Array.isArray(property)) {
            property.forEach((prop) => (styles[prop] = spacing as any));
        } else if (property) {
            styles[property] = spacing as any;
        }
    }

    public static parse(classString: string): YogaStyles {
        const classes = classString.trim().split(' ') as any[];
        const styles: YogaStyles = {};

        for (const cls of classes) {
            // Handle spacing utilities (p-, m-)
            const [key, value] = cls.split('-') as [keyof (typeof TailwindParser)['SPACING_MAP'], string];

            if (this.SPACING_MAP[key]) {
                this.parseSpacing(key, value, styles);
                continue;
            }

            // Handle size utilities (w-, h-, min-w-, min-h-, max-w-, max-h-)
            if (this.SIZE_MAP[key as keyof (typeof TailwindParser)['SIZE_MAP']]) {
                this.parseSize(key as keyof (typeof TailwindParser)['SIZE_MAP'], value, styles);
                continue;
            }

            // Handle display utilities
            if (this.DISPLAY_MAP[cls as keyof (typeof TailwindParser)['DISPLAY_MAP']]) {
                Object.assign(
                    styles,
                    this.DISPLAY_MAP[cls as keyof (typeof TailwindParser)['DISPLAY_MAP']] as YogaStyles,
                );
                continue;
            }

            // Handle flex utilities
            if (this.FLEX_MAP[cls as keyof (typeof TailwindParser)['FLEX_MAP']]) {
                Object.assign(styles, this.FLEX_MAP[cls as keyof (typeof TailwindParser)['FLEX_MAP']] as YogaStyles);
                continue;
            }
        }

        return styles;
    }
}

/**
 * Tagged template literal function for Tailwind-like styling in PixiJS Layout
 * Converts Tailwind-style class strings into PixiJS Layout style objects
 *
 * @param template - Template string array
 * @param templateElements - Dynamic values to interpolate
 * @returns YogaStyles object
 *
 * @example
 * // Basic usage
 * const styles = tw`p-4 m-2 flex-row items-center`;
 *
 * // With dynamic values
 * const padding = 4;
 * const styles = tw`p-${padding} flex-row`;
 *
 * // Using with PixiJS Layout
 * <container layout={tw`p-4 flex-row items-center justify-between`}>
 *   <sprite layout={tw`w-full h-20`} />
 * </container>
 */
export function tw(template: TemplateStringsArray, ...templateElements: any[]) {
    const res = template
        .reduce((sum, n, index) => {
            const templateElement = templateElements[index];

            if (typeof templateElement === 'string') {
                return `${sum}${n}${templateElement}`;
            }

            return `${sum}${n}`;
        }, '')
        .trim()
        .replace(/\s{2,}/g, ' ');

    // convert string to an object that can be used as a style
    return TailwindParser.parse(res);
}
