export default {
  context: 'global',
  treeshake: true,
  input: entryList,
  output: [
    {
      dir: "dist",
      format: "es",
      // format: "cjs",
      extend: true,
      sourcemap: false
    }
  ],
  /**
   * 为缺少exports的文件添加
   */
  shimMissingExports: true,
  /**
   * 以原有文件名创建新模块，tree sharking仍然会发挥作用
   */
  preserveModules: true,
  preserveSymlinks: true,
  plugins: plugins,
  watch: {
    exclude: [
      'libs/**',
      'build/**',
      'dist/**',
      'node_modules/**',
      'pages/login/**'
    ],
    chokidar: true
  },
  onwarn(warning) {
    // 跳过某些警告
    if (warning.code === 'PLUGIN_WARNING') return;
    if (!warning.code) return;
    console.log(warn(warning.message || warning));
  }
};