import process from 'node:process'
import { loadConfig } from 'c12'
import type { CliOption } from '../types'

const defaultOptions: CliOption = {
  cwd: process.cwd(),
  cleanupDirs: [
    '**/dist',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml',
    '**/node_modules',
    '!node_modules/**',
  ],
  gitCommitTypes: [
    ['feat', '新功能'],
    ['fix', 'bug修复'],
    ['docs', '仅文档更改'],
    ['style', '不影响代码含义的更改'],
    ['refactor', '既不修复错误也不增加功能的代码更改'],
    ['perf', '改进性能的代码更改'],
    ['test', '添加缺失的测试或更正现有的测试'],
    ['build', '影响构建系统或外部依赖的更改'],
    ['ci', '对CI配置文件和脚本的更改'],
    ['chore', '其他不修改src或测试文件的更改'],
    ['revert', '恢复之前的提交'],
  ],
  gitCommitScopes: [
    ['projects', '项目'],
    ['components', '组件'],
    ['hooks', '钩子函数'],
    ['utils', 'utils函数'],
    ['types', 'TS 公告'],
    ['styles', '风格'],
    ['deps', '项目 依赖项'],
    ['release', '发布项目'],
    ['other', '其他更改'],
  ],
  ncuCommandArgs: ['--deep', '-u'],
}

export async function loadCliOptions(overrides?: Partial<CliOption>, cwd = process.cwd()) {
  const { config } = await loadConfig<Partial<CliOption>>({
    name: 'soybean',
    defaults: defaultOptions,
    overrides,
    cwd,
    packageJson: true,
  })

  return config as CliOption
}
