"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// command dispatcher
var Command = require("commander").Command;
var program = new Command();
var chalk = require("chalk");
var createCommand = require("./commands/create");
var installCommand = require("./commands/install");
var serveCommand = require("./commands/serve");
var buildCommand = require("./commands/build");
var mapActions = {
    create: {
        alias: "c",
        description: "创建并初始化一个项目",
        examples: ["hex create <app-name>"],
    },
    serve: {
        alias: "s",
        description: "通过Vite启动本地服务",
        examples: ["hex serve"],
    },
    build: {
        alias: "b",
        description: "通过Vite编译构建生产资源",
        examples: ["hex build [--mode <env>]"],
    },
    install: {
        alias: "i",
        description: "代理安装npm包",
        examples: ["hex i"],
    },
    "*": {
        alias: "",
        description: "command not found",
        examples: [],
    },
};
var COMMAND_HELP = function () {
    console.log("\nExamples:");
    Object.keys(mapActions).forEach(function (action) {
        mapActions[action].examples.forEach(function (example) {
            console.log("" + example);
        });
    });
};
program
    .name("" + chalk.green("🌵 欢迎使用 hextech-cli ✨"))
    .usage("hex [command] [--options]");
program
    .command("create")
    .alias("c")
    .description("创建并初始化一个项目")
    .action(function () {
    //require(path.resolve(__dirname, `commands/create`))(...process.argv.slice(3));
    createCommand.apply(void 0, process.argv.slice(3));
});
program
    .command("install")
    .alias("i")
    .description("代理安装npm包")
    .option("-D, --dev", "指定安装到 devDependencies")
    .option("-S, --save", "指定安装到 dependencies")
    .action(function (option) {
    //require(path.resolve(__dirname, `commands/create`))(...process.argv.slice(3));
    installCommand.apply(void 0, __spreadArrays(process.argv.slice(3), [option]));
});
program
    .command("serve")
    .alias("s")
    .description("通过Vite启动本地服务")
    .action(function () {
    serveCommand.apply(void 0, process.argv.slice(3));
});
program
    .command("build")
    .alias("b")
    .description("通过Vite编译构建生产资源")
    .option("-m, --mode [mode]", "build for esnext or legacy browser,default 'esnext' ")
    .action(function (option, options) {
    buildCommand(option.mode);
});
// 导入版本号
var version = require("./constants").version;
/* 监听用户的help事件 */
program.on("--help", COMMAND_HELP);
program.on("-h", COMMAND_HELP);
program.addHelpText("after", chalk.green("Run") + " " + chalk.cyan("hex <command> --help") + " " + chalk.green("for detailed usage of given command"));
/* 设置脚手架版本信息 */
program.version(version);
/* 最后一步：将用户传递过来的参数解析为对应的 command */
program.parse(process.argv);
