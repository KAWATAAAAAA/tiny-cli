import Utils from "../utils/index";
const Shell = require("shelljs");
const chalk = require("chalk");
const privatePrefix = "@xsyx";
const privateResource = "https://mirrors.xsyxxd.com/repository/npm-group/";

interface Mode {
  [key: string]: boolean;
}
declare interface EachIterator {
  key: string;
  index: number;
  array: Array<any>;
  originObject: Record<string, any>;
}
module.exports = (arg: string, mode: Mode) => {
  const pkg = require(`${process.cwd()}/package.json`);
  console.log(chalk.green("🌵 正在由HaYa-CLI代理安装 npm 包...."));

  Utils.each(pkg.dependencies, eachHandler);
  Utils.each(pkg.devDependencies, eachHandler);
};

function eachHandler({ key, originObject }: EachIterator) {
  const name = key;
  // const reg = /^(@xsyx)/
  const reg = new RegExp(`(^${privatePrefix}\/)`, "i");
  /* 拿到版本号，并去掉修饰符 */
  const version = originObject[name];
  /* shell 语法： npm install [<@scope>/]<name>@<version range> */
  if (reg.test(name)) {
    Shell.exec(
      `npm install ${name}@"${version}" --registry ${privateResource}`
    );
  } else {
    Shell.exec(
      `npm install ${name}@"${version}" --registry https://registry.npmjs.org/`
    );
  }
}

export {};
