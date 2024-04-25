/*
 * @Author: 周恩波 zhouenbo@lx-dtx.com
 * @Date: 2024-04-24 17:30:30
 * @LastEditors: 周恩波
 * @LastEditTime: 2024-04-24 17:45:27
 * @Description:
 */
import path from 'node:path'
import { readFileSync } from 'node:fs'
import { prompt } from 'enquirer'

import { bgRed, green, red, yellow } from 'kolorist'
import { execCommand } from '../shared'
import type { CliOption } from '../types'

interface PromptObject {
  types: string
  scopes: string
  description: string
}

/**
 * Git提交使用常规提交标准
 * @param gitCommitTypes
 * @param gitCommitScopes
 */
export async function gitCommit(
  gitCommitTypes: CliOption['gitCommitTypes'],
  gitCommitScopes: CliOption['gitCommitScopes'],
) {
  const typesChoices = gitCommitTypes.map(([value, msg]) => {
    const nameWithSuffix = `${value}:`

    const message = `${nameWithSuffix.padEnd(12)}${msg}`

    return {
      name: value,
      message,
    }
  })
  const scopesChoices = gitCommitScopes.map(([value, msg]) => ({
    name: value,
    message: `${value.padEnd(30)} (${msg})`,
  }))
  const result = await prompt<PromptObject>([
    {
      name: 'types',
      type: 'select',
      message: '请选择类型',
      choices: typesChoices,
    },
    {
      name: 'scopes',
      type: 'select',
      message: '请选择一个范围',
      choices: scopesChoices,
    },
    {
      name: 'description',
      type: 'text',
      message: `请输入描述 (添加前缀 ${yellow('!')} 来表示突破性的变化)`,
    },
  ])
  const breaking = result.description.startsWith('!') ? '!' : ''

  const description = result.description.replace(/^!/, '').trim()

  const commitMsg = `${result.types}(${result.scopes})${breaking}: ${description}`

  await execCommand('git', ['commit', '-m', commitMsg], { stdio: 'inherit' })
}

/** Git提交消息验证 */
export async function gitCommitVerify() {
  const gitPath = await execCommand('git', ['rev-parse', '--show-toplevel'])

  const gitMsgPath = path.join(gitPath, '.git', 'COMMIT_EDITMSG')

  const commitMsg = readFileSync(gitMsgPath, 'utf8').trim()

  const REG_EXP = /(?<type>[a-z]+)(?:\((?<scope>.+)\))?(?<breaking>!)?: (?<description>.+)/i

  if (!REG_EXP.test(commitMsg)) {
    throw new Error(
      `${bgRed(' ERROR ')} ${red('git提交消息必须符合常规提交标准!')}\n\n${green(
        '建议使用该命令 `pnpm commit` 生成符合常规提交的提交信息.\n获取有关常规提交的更多信息, 点击此链接: https://conventionalcommits.org',
      )}`,
    )
  }
}
