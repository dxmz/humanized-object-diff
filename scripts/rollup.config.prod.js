import filesize from 'rollup-plugin-filesize';
import { terser } from "rollup-plugin-terser";
import baseConfig from './rollup.config.base';
import {name, version, author} from '../package.json';

// banner
const banner =
    `${'/*!\n' + ' * '}${name}.js v${version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
    ` * Released under the MIT License.\n` +
    ` */`;

// 支持输出 []
export default [
    // .js, .cjs.js, .esm.js
    {
        ...baseConfig,
        input: 'index.js',
        output: [
            // umd development version with sourcemap
            {
                file: `lib/${name}.umd.js`,
                format: 'umd',
                name,
                banner
            },
            // cjs version
            {
                file: `lib/${name}.cjs.js`,
                format: 'cjs',
                banner
            },
            // esm version
            {
                file: `lib/${name}.js`,
                format: 'es',
                banner
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            filesize()
        ]
    },
    // .min.js
    {
        ...baseConfig,
        input: 'index.js',
        output: [
            // umd with compress version
            {
                file: `lib/${name}.min.js`,
                format: 'es',
                name,
                banner
            }
        ],
        plugins: [
            ...baseConfig.plugins,
            terser(),
            filesize()
        ]
    }
];
