// command dispatcher
const { Command } = require("commander");
const program = new Command();
const chalk = require("chalk");
const createCommand = require("./commands/create");
const installCommand = require("./commands/install");
const serveCommand = require("./commands/serve");
const buildCommand: (mode?: string) => void = require("./commands/build");
declare interface MapAction {
  create: CommandInfo;
  [key: string]: CommandInfo;
}

declare interface CommandInfo {
  alias: string;
  description: string;
  examples: Array<string>;
}

const mapActions: MapAction = {
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

const COMMAND_HELP = (): void => {
  console.log("\nExamples:");
  Object.keys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((example) => {
      console.log(`${example}`);
    });
  });
};
program
  .name(`${chalk.green("🌵 欢迎使用 hextech-cli ✨")}`)
  .usage("hex [command] [--options]");

program
  .command("create")
  .alias("c")
  .description("创建并初始化一个项目")
  .action(() => {
    //require(path.resolve(__dirname, `commands/create`))(...process.argv.slice(3));
    createCommand(...process.argv.slice(3));
  });
program
  .command("install")
  .alias("i")
  .description("代理安装npm包")
  .option("-D, --dev", "指定安装到 devDependencies")
  .option("-S, --save", "指定安装到 dependencies")
  .action((option: any) => {
    //require(path.resolve(__dirname, `commands/create`))(...process.argv.slice(3));
    installCommand(...process.argv.slice(3), option);
  });
program
  .command("serve")
  .alias("s")
  .description("通过Vite启动本地服务")
  .action(() => {
    serveCommand(...process.argv.slice(3));
  });
program
  .command("build")
  .alias("b")
  .description("通过Vite编译构建生产资源")
  .option(
    "-m, --mode [mode]",
    "build for esnext or legacy browser,default 'esnext' "
  )
  .action((option: any, options: any) => {
    buildCommand(option.mode);
  });

// 导入版本号
const { version } = require("./constants");

/* 监听用户的help事件 */
program.on("--help", COMMAND_HELP);
program.on("-h", COMMAND_HELP);

program.addHelpText(
  "after",
  `${chalk.green("Run")} ${chalk.cyan("hex <command> --help")} ${chalk.green(
    "for detailed usage of given command"
  )}`
);
/* 设置脚手架版本信息 */
program.version(version);
/* 最后一步：将用户传递过来的参数解析为对应的 command */
program.parse(process.argv);
