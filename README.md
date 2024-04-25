# 技术架构
	- Vue 3 + TypeScript + Vite

### 安装pnpm
  1.npm i pnpm -g
  2.pnpm config get registry //查看源
  3.pnpm config set registry https://registry.npm.taobao.org //切换淘宝源
### 使用vite创建项目
  1. pnpm create vite
### 安装eslint
	1. pnpm add eslint --save-dev

### 使用pnpm workspace
1、添加pnpm-workspace.yaml文件，内容如下：
packages:
  -'packages/**'
2.新建packages目录 在子目录里面是用pnpm init生成package.json文件 修改name名
3.pnpm i @pkg/scripts --filter @pkg/scripts
