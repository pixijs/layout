import { describe, expect, it } from 'vitest';
import { tw } from '../../src/tailwind/ptw';

describe('tw function', () => {
    describe('spacing utilities', () => {
        it('should parse padding utilities', () => {
            expect(tw`p-4`).toEqual({ padding: 16 });
            expect(tw`p-8`).toEqual({ padding: 32 });
            expect(tw`p-0`).toEqual({ padding: 0 });
            expect(tw`p-px`).toEqual({ padding: 1 });
        });

        it('should parse directional padding utilities', () => {
            expect(tw`pt-4`).toEqual({ paddingTop: 16 });
            expect(tw`pr-4`).toEqual({ paddingRight: 16 });
            expect(tw`pb-4`).toEqual({ paddingBottom: 16 });
            expect(tw`pl-4`).toEqual({ paddingLeft: 16 });
        });

        it('should parse axis padding utilities', () => {
            expect(tw`px-4`).toEqual({ paddingLeft: 16, paddingRight: 16 });
            expect(tw`py-4`).toEqual({ paddingTop: 16, paddingBottom: 16 });
        });

        it('should parse margin utilities', () => {
            expect(tw`m-4`).toEqual({ margin: 16 });
            expect(tw`m-8`).toEqual({ margin: 32 });
            expect(tw`m-0`).toEqual({ margin: 0 });
            expect(tw`m-px`).toEqual({ margin: 1 });
        });

        it('should parse directional margin utilities', () => {
            expect(tw`mt-4`).toEqual({ marginTop: 16 });
            expect(tw`mr-4`).toEqual({ marginRight: 16 });
            expect(tw`mb-4`).toEqual({ marginBottom: 16 });
            expect(tw`ml-4`).toEqual({ marginLeft: 16 });
        });

        it('should parse axis margin utilities', () => {
            expect(tw`mx-4`).toEqual({ marginLeft: 16, marginRight: 16 });
            expect(tw`my-4`).toEqual({ marginTop: 16, marginBottom: 16 });
        });

        it('should parse gap utilities', () => {
            expect(tw`gap-4`).toEqual({ gap: 16 });
            expect(tw`gap-x-4`).toEqual({ gap: NaN });
            expect(tw`gap-y-4`).toEqual({ gap: NaN });
        });
    });

    describe('size utilities', () => {
        it('should parse width utilities', () => {
            expect(tw`w-4`).toEqual({ width: 16 });
            expect(tw`w-8`).toEqual({ width: 32 });
            expect(tw`w-0`).toEqual({ width: 0 });
            expect(tw`w-px`).toEqual({ width: 1 });
        });

        it('should parse height utilities', () => {
            expect(tw`h-4`).toEqual({ height: 16 });
            expect(tw`h-8`).toEqual({ height: 32 });
            expect(tw`h-0`).toEqual({ height: 0 });
            expect(tw`h-px`).toEqual({ height: 1 });
        });

        it('should parse size utilities (width and height)', () => {
            expect(tw`size-4`).toEqual({ width: 16, height: 16 });
            expect(tw`size-8`).toEqual({ width: 32, height: 32 });
        });

        it('should parse min-width utilities', () => {
            expect(tw`min-w-4`).toEqual({});
            expect(tw`min-w-8`).toEqual({});
        });

        it('should parse min-height utilities', () => {
            expect(tw`min-h-4`).toEqual({});
            expect(tw`min-h-8`).toEqual({});
        });

        it('should parse max-width utilities', () => {
            expect(tw`max-w-4`).toEqual({});
            expect(tw`max-w-8`).toEqual({});
        });

        it('should parse max-height utilities', () => {
            expect(tw`max-h-4`).toEqual({});
            expect(tw`max-h-8`).toEqual({});
        });

        it('should parse percentage and special values', () => {
            expect(tw`w-full`).toEqual({ width: '100%' });
            expect(tw`h-full`).toEqual({ height: '100%' });
            expect(tw`w-screen`).toEqual({ width: '100vh' });
            expect(tw`h-screen`).toEqual({ height: '100vh' });
            expect(tw`w-auto`).toEqual({ width: 'auto' });
            expect(tw`h-auto`).toEqual({ height: 'auto' });
        });

        it('should parse fraction values', () => {
            expect(tw`w-1/2`).toEqual({ width: '50%' });
            expect(tw`w-1/3`).toEqual({ width: '33.333333%' });
            expect(tw`w-2/3`).toEqual({ width: '66.666667%' });
            expect(tw`w-1/4`).toEqual({ width: '25%' });
            expect(tw`w-2/4`).toEqual({ width: '50%' });
            expect(tw`w-3/4`).toEqual({ width: '75%' });
            expect(tw`w-1/5`).toEqual({ width: '20%' });
            expect(tw`w-2/5`).toEqual({ width: '40%' });
            expect(tw`w-3/5`).toEqual({ width: '60%' });
            expect(tw`w-4/5`).toEqual({ width: '80%' });
        });
    });

    describe('flex utilities', () => {
        it('should parse flex direction utilities', () => {
            expect(tw`flex-row`).toEqual({ flexDirection: 'row' });
            expect(tw`flex-col`).toEqual({ flexDirection: 'column' });
            expect(tw`flex-row-reverse`).toEqual({ flexDirection: 'row-reverse' });
            expect(tw`flex-col-reverse`).toEqual({ flexDirection: 'column-reverse' });
        });

        it('should parse flex wrap utilities', () => {
            expect(tw`flex-wrap`).toEqual({ flexWrap: 'wrap' });
            expect(tw`flex-wrap-reverse`).toEqual({ flexWrap: 'wrap-reverse' });
            expect(tw`flex-nowrap`).toEqual({ flexWrap: 'nowrap' });
        });

        it('should parse flex grow utilities', () => {
            expect(tw`grow-0`).toEqual({ flexGrow: 0 });
            expect(tw`grow`).toEqual({ flexGrow: 1 });
        });

        it('should parse flex shrink utilities', () => {
            expect(tw`shrink-0`).toEqual({ flexShrink: 0 });
            expect(tw`shrink`).toEqual({ flexShrink: 1 });
        });

        it('should parse justify content utilities', () => {
            expect(tw`justify-start`).toEqual({ justifyContent: 'flex-start' });
            expect(tw`justify-center`).toEqual({ justifyContent: 'center' });
            expect(tw`justify-end`).toEqual({ justifyContent: 'flex-end' });
            expect(tw`justify-between`).toEqual({ justifyContent: 'space-between' });
            expect(tw`justify-around`).toEqual({ justifyContent: 'space-around' });
            expect(tw`justify-evenly`).toEqual({ justifyContent: 'space-evenly' });
        });

        it('should parse align items utilities', () => {
            expect(tw`items-start`).toEqual({ alignItems: 'flex-start' });
            expect(tw`items-center`).toEqual({ alignItems: 'center' });
            expect(tw`items-end`).toEqual({ alignItems: 'flex-end' });
            expect(tw`items-baseline`).toEqual({ alignItems: 'baseline' });
            expect(tw`items-stretch`).toEqual({ alignItems: 'stretch' });
        });

        it('should parse align content utilities', () => {
            expect(tw`content-start`).toEqual({ alignContent: 'flex-start' });
            expect(tw`content-center`).toEqual({ alignContent: 'center' });
            expect(tw`content-end`).toEqual({ alignContent: 'flex-end' });
            expect(tw`content-between`).toEqual({ alignContent: 'space-between' });
            expect(tw`content-around`).toEqual({ alignContent: 'space-around' });
            expect(tw`content-evenly`).toEqual({ alignContent: 'space-evenly' });
            expect(tw`content-stretch`).toEqual({ alignContent: 'stretch' });
        });

        it('should parse align self utilities', () => {
            expect(tw`self-auto`).toEqual({ alignSelf: 'auto' });
            expect(tw`self-start`).toEqual({ alignSelf: 'flex-start' });
            expect(tw`self-center`).toEqual({ alignSelf: 'center' });
            expect(tw`self-end`).toEqual({ alignSelf: 'flex-end' });
            expect(tw`self-stretch`).toEqual({ alignSelf: 'stretch' });
            expect(tw`self-baseline`).toEqual({ alignSelf: 'baseline' });
        });
    });

    describe('color utilities', () => {
        it('should parse background color utilities', () => {
            expect(tw`bg-red`).toEqual({ backgroundColor: 'red' });
            expect(tw`bg-blue`).toEqual({ backgroundColor: 'blue' });
            expect(tw`bg-transparent`).toEqual({ backgroundColor: 'transparent' });
            expect(tw`bg-white`).toEqual({ backgroundColor: 'white' });
            expect(tw`bg-black`).toEqual({ backgroundColor: 'black' });
        });
    });

    describe('multiple utilities', () => {
        it('should parse multiple spacing utilities', () => {
            expect(tw`p-4 m-2`).toEqual({ padding: 16, margin: 8 });
            expect(tw`px-4 py-2`).toEqual({ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8 });
        });

        it('should parse multiple size utilities', () => {
            expect(tw`w-full h-4`).toEqual({ width: '100%', height: 16 });
            expect(tw`min-w-4 max-w-8`).toEqual({});
        });

        it('should parse multiple flex utilities', () => {
            expect(tw`flex-row items-center justify-between`).toEqual({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            });
        });

        it('should parse mixed utilities', () => {
            expect(tw`p-4 w-full flex-row items-center bg-red`).toEqual({
                padding: 16,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'red',
            });
        });
    });

    describe('template literal functionality', () => {
        it('should handle template literals with string interpolation', () => {
            const padding = '4';
            const direction = 'row';

            expect(tw`p-${padding} flex-${direction}`).toEqual({
                padding: 16,
                flexDirection: 'row',
            });
        });

        it('should handle template literals with multiple interpolations', () => {
            const spacing = '8';
            const color = 'blue';

            expect(tw`p-${spacing} bg-${color} flex-row`).toEqual({
                padding: 32,
                backgroundColor: 'blue',
                flexDirection: 'row',
            });
        });

        it('should handle template literals with non-string interpolations', () => {
            const number = 4;
            const object = { test: 'value' };

            expect(tw`p-4 flex-row ${number} ${object}`).toEqual({
                padding: 16,
                flexDirection: 'row',
            });
        });

        it('should normalize whitespace in template literals', () => {
            expect(tw`  p-4    m-2   `).toEqual({ padding: 16, margin: 8 });
            expect(tw`p-4   m-2   flex-row`).toEqual({
                padding: 16,
                margin: 8,
                flexDirection: 'row',
            });
        });

        it('should handle empty template literals', () => {
            expect(tw``).toEqual({});
            expect(tw`   `).toEqual({});
        });
    });

    describe('edge cases', () => {
        it('should handle unknown utilities gracefully', () => {
            expect(tw`unknown-utility`).toEqual({});
            expect(tw`p-4 unknown-utility m-2`).toEqual({ padding: 16, margin: 8 });
        });

        it('should handle malformed utilities', () => {
            expect(tw`p-`).toEqual({ padding: 0 });
            expect(tw`-4`).toEqual({});
            expect(tw`p-4-extra`).toEqual({ padding: 16 });
        });

        it('should handle utilities without values', () => {
            expect(tw`flex-row p-4 justify-center`).toEqual({
                flexDirection: 'row',
                padding: 16,
                justifyContent: 'center',
            });
        });

        it('should handle zero values', () => {
            expect(tw`p-0 m-0 w-0 h-0`).toEqual({
                padding: 0,
                margin: 0,
                width: 0,
                height: 0,
            });
        });

        it('should handle large numeric values', () => {
            expect(tw`p-100`).toEqual({ padding: 400 });
            expect(tw`w-100`).toEqual({ width: 400 });
        });
    });

    describe('base unit conversion', () => {
        it('should convert values using the base unit of 4', () => {
            expect(tw`p-1`).toEqual({ padding: 4 });
            expect(tw`p-2`).toEqual({ padding: 8 });
            expect(tw`p-3`).toEqual({ padding: 12 });
            expect(tw`p-4`).toEqual({ padding: 16 });
            expect(tw`p-5`).toEqual({ padding: 20 });
        });

        it('should handle px values correctly', () => {
            expect(tw`p-px`).toEqual({ padding: 1 });
            expect(tw`m-px`).toEqual({ margin: 1 });
            expect(tw`w-px`).toEqual({ width: 1 });
            expect(tw`h-px`).toEqual({ height: 1 });
        });
    });
});
