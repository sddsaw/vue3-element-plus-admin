/*
 * @Author: 周恩波 zhouenbo@lx-dtx.com
 * @Date: 2024-04-24 17:32:54
 * @LastEditors: 周恩波
 * @LastEditTime: 2024-04-24 17:36:13
 * @Description:
 */
export interface CliOption {
  /** 项目根目录 */
  cwd: string
  /**
   * 清洁样子有点奇怪当心点
   *
   * 全局模式语法 {@link https://github.com/isaacs/minimatch}
   *
   * @default
   * ```json
   * ["** /dist", "** /pnpm-lock.yaml", "** /node_modules", "!node_modules/**"]
   * ```
   */
  cleanupDirs: string[]
  /** Git提交类型 */
  gitCommitTypes: [string, string][]
  /** Git提交作用域 */
  gitCommitScopes: [string, string][]
  /**
   * Npm-check-updates 命令参数
   *
   * @default ['--deep', '-u']
   */
  ncuCommandArgs: string[]
  /**
   * 生成变更日志的选项
   *
   * @link https://github.com/soybeanjs/changelog
   */
  // changelogOptions: Partial<ChangelogOption>;
}
