import commonjs from '@rollup/plugin-commonjs';
export default {
  input: 'a.js',
  output: {
    file: 'bundle.js',
    format: 'es'
  },
  plugins: [commonjs({
    // esmExternals:true
  })],
  // shimMissingExports: true,
  // preserveModules: true,
};


