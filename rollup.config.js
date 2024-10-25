import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: pkg.module,
  output: [
    {
      file: pkg.main,
      format: 'iife',
      name: 'Consenty',
      plugins: [
        terser({
          compress: {
            drop_console: true
          },
          format: {
            comments: false
          }
        })
      ]
    }
  ],
  plugins: [
    resolve()
  ]
}
