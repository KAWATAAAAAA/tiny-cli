"use strict";
// command dispatcher
Object.defineProperty(exports, "__esModule", { value: true });
var program = require('commander');
var path = require('path');
/* 配置命令 */
var mapActions = {
    create: {
        alias: 'c',
        description: '创建并初始化一个项目',
        examples: [
            'xsfe create <app-name>',
        ],
    },
    serve: {
        alias: 's',
        description: '通过Vite启动本地服务',
        examples: [
            'xsfe serve',
        ],
    },
    build: {
        alias: 'b',
        description: '通过Vite编译构建生产资源',
        examples: [
            'xsfe build [--mode=<env>]',
        ],
    },
    '*': {
        alias: '',
        description: 'command not found',
        examples: [],
    },
};
var COMMAND_HELP = function () {
    console.log('\nExamples:');
    Object.keys(mapActions).forEach(function (action) {
        mapActions[action].examples.forEach(function (example) {
            console.log("" + example);
        });
    });
};
/* 配置命令信息 */
Object.keys(mapActions).forEach(function (action) {
    program
        .command(action) // 配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(function () {
        if (action === '*') {
            console.log(mapActions[action].description);
        }
        else {
            /**
             * xsfe-cli create xxx
             * @slice 截取命令行中的第三个参数 xxx 当做项目名称
             * @action 直接用文件名作为执行命名的动作名称
             */
            //console.log(path.resolve(__dirname, `commands/${action}`))
            require(path.resolve(__dirname, "commands/" + action)).apply(void 0, process.argv.slice(3));
        }
    });
});
/* 监听用户的help事件 */
program.on('--help', COMMAND_HELP);
program.on('-h', COMMAND_HELP);
// 导入版本号
var version = require('./constants').version;
// 解析用户传递过来的参数
// program.parse(process.argv);
program.version(version).parse(process.argv);
