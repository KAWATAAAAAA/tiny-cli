# Hextech-CLI
使用前缀是通过全局安装（npm i hex-cli -g）后输入 hex 唤醒。
hextech 名字来源于LOL的海克斯科技，海克斯科技枪、海克斯腰带、海克斯飞门  
仓库名称是 tiny-cli ，项目名称修改为了hex，因为npm 上已经有一个这个包了，....
## Features

- 💡 拉取项目开发模板
- ⚡️ 继承vite特性，本地dev 秒开
- 📦 无需书写任何配置可以直接在模板项目中build
- 🛠️ build 支持 option 两种方式，esm 与 legacy

## Dev dependencies module

- **commander** ：参数解析 --help其实就借助了他
- **inquirer** ：交互式命令行工具，可以实现命令行的选择功能
- **download-git-repo** ：在git中下载模板
- **chalk** ：在控制台中画出各种各样的颜色
- **metalsmith** ：读取所有文件,实现模板渲染
- **consolidate** :  统一模板引擎 

## 目前实现的功能:

```js
/* 根据模板初始化项目 */ 
hex create <app-name>
/* 启用本地服务 */ 
hex serve
/* 构建生成代码 */
hex build [option]
```

## Project view

- src 文件目录

<pre>

├── commands // 核心实现命令
│   ├── build.ts
│   ├── create.ts
│   └── serve.ts
├── constants.ts  
├── index.ts // 入口
├── plugins // 插件
│   ├── rollup-plugin-build-state.ts
│   └── rollup-plugin-write.ts
└── types // 类型声明
    ├── command.d.ts
    ├── create.d.ts
    └── index.d.ts
</pre>


### Project publish

```js
nrm use npm  // 准备发布包
npm addUser  // 填写账号密码
npm login // 填写账户，密码
npm owner add [username] [package name] // 给别人开权限
npm publish  // 发布
```

### 脚手架按需引入 
所需插件：（以后有需求再做）
https://github.com/anncwb/vite-plugin-style-import

## Debug

debug 方式使用`.vscode` 下的文件启动 ts-node 调试,调试的时候记得把 `tsconfig.json` 下的 `sourceMap` 打开


## 本地测试流程

```bash
npm run dev
npm link
hex -h
``` 


## 预计开发功能

- hex push --utils 用于发布前的检测，手动加上私有前缀发布，切换源进行npm publish 