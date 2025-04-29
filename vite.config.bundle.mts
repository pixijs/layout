import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        {
            ...nodeExternals(),
            enforce: 'pre',
        },
        dts({ rollupTypes: true }),
    ],
    build: {
        minify: false,
        lib: {
            formats: ['es'],
            entry: ['./src/index.ts', './src/components/index.ts'],
        },
        outDir: 'docs/src/build-sandpack',
    },
});
