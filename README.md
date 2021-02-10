# Tiny-Cli



## 1.必备模块


- **commander** ：参数解析 --help其实就借助了他
- **inquirer** ：交互式命令行工具，可以实现命令行的选择功能
- **download-git-repo** ：在git中下载模板
- **chalk** ：粉笔帮我们在控制台中画出各种各样的颜色
- **metalsmith** ：读取所有文件,实现模板渲染
- **consolidate** :  统一模板引擎 

目前实现的功能:

```js
/* 根据模板初始化项目 */ 
xsfe-cli create project-name
/* 初始化配置文件 */ 
xsfe-cli config set repo repo-name
```

## 2.工程创建

### 2.1 创建文件夹

- 整个文件目录

```js
├── bin 
│ └── www // 全局命令执行的根文件 
├── package.json 
├── src 
│ ├── constants.js // 存放常量
│ ├── create.js // create命令逻辑 
│ ├── config.js // config命令逻辑 
│ ├── main.js // 入口文件 
│ └── utils // 存放工具方法 
│── .huskyrc // git hook 
│── .eslintrc.json // 代码规范校验
```



### 项目发布

```js
nrm use npm  // 准备发布包
npm addUser  // 填写账号密码
npm publish  // 已经发布成功
```





