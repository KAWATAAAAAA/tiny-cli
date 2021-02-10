import { MapAction } from "./types"
const program = require('commander');
const path = require('path');

/* 配置命令 */ 
const mapActions:MapAction = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'xsfe-cli create <app-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'xsfe-cli config set <k><v>',
      'xsfe-cli config get <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

const COMMAND_HELP = ():void => {
    console.log('\nExamples:');
    Object.keys(mapActions).forEach((action) => {
      mapActions[action].examples.forEach((example) => {
        console.log(`${example}`);
      });
    });
  }
/* 配置命令信息 */ 
Object.keys(mapActions).forEach((action:string) => {
  program
    .command(action) // 配置命令的名字
    .alias(mapActions[action].alias) // 命令的别名
    .description(mapActions[action].description) // 命令对应的描述
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        /**
         * xsfe-cli create xxx 
         * @slice 截取命令行中的第三个参数 xxx 当做项目名称
         * @action 直接用文件名作为执行命名的动作名称
         */
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});
/* 监听用户的help事件 */ 
program.on('--help',COMMAND_HELP);
program.on('-h',COMMAND_HELP);


// 导入版本号
const {
  version,
} = require('./constants');
// 解析用户传递过来的参数
// program.parse(process.argv);
program.version(version).parse(process.argv);
