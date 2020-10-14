import commonjs from '@rollup/plugin-commonjs';
export default {
  input: 'a.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [commonjs({
    // esmExternals:true
  })],
};