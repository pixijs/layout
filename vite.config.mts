import nodeExternals from 'rollup-plugin-node-externals';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        {
            ...nodeExternals(),
            enforce: 'pre',
        },
        dts({
            entryRoot: './src',
            include: './src',
        }),
    ],
    build: {
        minify: false,
        sourcemap: true,
        lib: {
            formats: ['es', 'cjs'],
            entry: [
                './src/index.ts',
                './src/devtool/index.ts',
                './src/react/index.ts',
                './src/components/index.ts',
                './src/tailwind/index.ts',
            ],
            fileName: (format, name) => `${name}.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
            output: {
                preserveModules: true,
                preserveModulesRoot: './src',
                interop: 'auto',
                exports: 'named',
            },
        },
    },
});
