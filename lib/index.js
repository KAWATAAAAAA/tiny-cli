"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = require("commander").Command;
var program = new Command();
var chalk = require("chalk");
var createCommand = require("./commands/create");
var serveCommand = require("./commands/serve");
var buildCommand = require("./commands/build");
var mapActions = {
    create: {
        alias: "c",
        description: "创建并初始化一个项目",
        examples: ["xsfe create <app-name>"],
    },
    serve: {
        alias: "s",
        description: "通过Vite启动本地服务",
        examples: ["xsfe serve"],
    },
    build: {
        alias: "b",
        description: "通过Vite编译构建生产资源",
        examples: ["xsfe build [--mode <env>]"],
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
    .command("create")
    .alias("c")
    .description("创建并初始化一个项目")
    .action(function () {
    //require(path.resolve(__dirname, `commands/create`))(...process.argv.slice(3));
    createCommand.apply(void 0, process.argv.slice(3));
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
program.addHelpText("after", chalk.green("Run") + " " + chalk.cyan("xsfe <command> --help") + " " + chalk.green("for detailed usage of given command"));
/* 设置脚手架版本信息 */
program.version(version);
/* 最后一步：将用户传递过来的参数解析为对应的 command */
program.parse(process.argv);
//# sourceMappingURL=index.js.map