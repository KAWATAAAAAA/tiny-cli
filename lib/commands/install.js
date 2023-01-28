"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Shell = require("shelljs");
var chalk = require("chalk");
var privatePrefix = "@xsyx";
var privateResource = "https://mirrors.xsyxxd.com/repository/npm-group/";
module.exports = function (arg, mode) {
    // const pkg = require(`${process.cwd()}/package.json`);
    console.log(chalk.green("🌵 正在由Hextech-CLI代理安装 npm 包...."));
    console.log(chalk.green("🌵 原理就是 npmrc scope: https://docs.npmjs.com/cli/v7/configuring-npm/npmrc/#comments"));
    // Utils.each(pkg.dependencies, eachHandler);
    // Utils.each(pkg.devDependencies, eachHandler);
};
function eachHandler(_a) {
    var key = _a.key, originObject = _a.originObject;
    var name = key;
    // const reg = /^(@xsyx)/
    var reg = new RegExp("(^" + privatePrefix + "/)", "i");
    /* 拿到版本号，并去掉修饰符 */
    var version = originObject[name];
    /* shell 语法： npm install [<@scope>/]<name>@<version range> */
    if (reg.test(name)) {
        console.log("草泥马1");
        Shell.exec("npm install " + name + "@\"" + version + "\" --registry " + privateResource);
    }
    else {
        console.log("草泥马2");
        Shell.exec("npm install " + name + "@\"" + version + "\" --registry https://registry.npmjs.org/");
    }
}
