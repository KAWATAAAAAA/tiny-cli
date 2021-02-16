# Tiny-Cli


## 1.必备模块


- **commander** ：参数解析 --help其实就借助了他
- **inquirer** ：交互式命令行工具，可以实现命令行的选择功能
- **download-git-repo** ：在git中下载模板
- **chalk** ：在控制台中画出各种各样的颜色
- **metalsmith** ：读取所有文件,实现模板渲染
- **consolidate** :  统一模板引擎 

目前实现的功能:

```js
/* 根据模板初始化项目 */ 
xsfe create <app-name>
/* 启用本地服务 */ 
xsfe serve
/* 构建生成代码 */
xsfe build
```

## 2.工程创建

- src 文件目录

<pre>

├── commands // 核心实现命令
│   ├── build.ts
│   ├── create.ts
│   └── serve.ts
├── constants.ts  // 常量存放
├── index.ts // 入口
├── plugins // 插件
│   ├── rollup-plugin-build-state.ts
│   └── rollup-plugin-write.ts
└── types // 类型声明
    ├── command.d.ts
    ├── create.d.ts
    └── index.d.ts
</pre>


### 项目发布

```js
nrm use npm  // 准备发布包
npm addUser  // 填写账号密码
npm publish  // 已经发布成功
```

### 脚手架按需引入 

https://github.com/anncwb/vite-plugin-style-import





