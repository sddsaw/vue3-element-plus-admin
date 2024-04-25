import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    files: ['**/*.vue'],
    rules: { },
  },
  {
    files: ['**/*.ts'],
    rules: { },
  },
  {
    // 没有“文件”，它们是所有文件的通用规则
    rules: {
      'curly': 'error',
      'no-console': 'warn',
    },
  },
)
