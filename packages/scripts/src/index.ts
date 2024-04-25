/*
 * @Author: 周恩波 zhouenbo@lx-dtx.com
 * @Date: 2024-04-24 16:13:20
 * @LastEditors: 周恩波
 * @LastEditTime: 2024-04-25 10:51:55
 * @Description:
 */
import cac from 'cac'
import { blue, lightGreen } from 'kolorist'
import { version } from '../package.json'
import { gitCommit, gitCommitVerify } from './commands'
import { loadCliOptions } from './config'

type Command = 'git-commit' | 'git-commit-verify'
type CommandAction<A extends object> = (args?: A) => Promise<void> | void
type CommandWithAction<A extends object = object> = Record<Command, { desc: string, action: CommandAction<A> }>
interface CommandArg {
  /** 在碰撞之后和git提交之前执行额外的命令。默认为'pnpm sa changelog' */
  execute?: string
  /** 是否推送git提交和标签。默认为true */
  push?: boolean
  /** 按总标签生成变更日志 */
  total?: boolean
  /**
   * 要清理的目录的glob模式
   *
   * 如果未设置，将使用默认值
   *
   * 多个值使用“，”来分隔它们
   */
  cleanupDir?: string
}
export async function setupCli() {
  const cliOptions = await loadCliOptions()

  const cli = cac(blue('soybean-admin'))

  cli
    .version(lightGreen(version))
    .option(
      '-e, --execute [command]',
      '在碰撞之后和git提交之前执行附加命令。默认为 \'npx soy changelog\'',
    )
    .option('-p, --push', '指示是否推送git提交和标记')
    .option('-t, --total', '按总标记生成变更日志')
    .option(
      '-c, --cleanupDir <dir>',
      '要清理的目录的glob模式, 如果没有设置, 它将使用默认值, 多个值使用“, ”来分隔它们',
    )
    .help()

  const commands: CommandWithAction<CommandArg> = {

    'git-commit': {
      desc: 'git-commit，生成符合常规Commits标准的提交消息',
      action: async () => {
        await gitCommit(cliOptions.gitCommitTypes, cliOptions.gitCommitScopes)
      },
    },
    'git-commit-verify': {
      desc: '验证git-commit消息，确保其符合常规Commits标准',
      action: async () => {
        await gitCommitVerify()
      },
    },
  }

  for (const [command, { desc, action }] of Object.entries(commands))
    cli.command(command, lightGreen(desc)).action(action)

  cli.parse()
}

setupCli()
