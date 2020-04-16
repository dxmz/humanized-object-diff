import baseConfig from './rollup.config.base';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';
import livereload from 'rollup-plugin-livereload';

import {name} from '../package.json';

export default {
    ...baseConfig,
    input: 'example/src/app.jsx',
    output: [
        {
            file: `example/dist/${name}.js`,
            format: 'es',
            name,
            sourcemap: true
        },
        {
            file: `example/dist/${name}.umd.js`,
            format: 'umd',
            name
        },
        {
            file: `example/dist/${name}.cjs.js`,
            format: 'cjs',
            name,
            sourcemap: 'inline'
        }
    ],
    plugins: [
        ...baseConfig.plugins,
        copy({
            targets: [{ src: 'example/src/index.html', dest: 'example/dist' }]
        }),
        livereload({watch: 'example/dist'}),
        serve({
            port: 3000,
            contentBase: ['example/dist'],
            historyApiFallback: true,
        })
    ]
};
