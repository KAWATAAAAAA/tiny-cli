"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../utils/index"));
var Shell = require("shelljs");
var chalk = require("chalk");
var privatePrefix = "@xsyx";
var privateResource = "https://mirrors.xsyxxd.com/repository/npm-group/";
module.exports = function (arg, mode) {
    var pkg = require(process.cwd() + "/package.json");
    console.log(chalk.green("🌵 正在由HaYa-CLI代理安装 npm 包...."));
    index_1.default.each(pkg.dependencies, eachHandler);
    index_1.default.each(pkg.devDependencies, eachHandler);
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
        Shell.exec("npm install " + name + "@\"" + version + "\" --registry " + privateResource);
    }
    else {
        Shell.exec("npm install " + name + "@\"" + version + "\" --registry https://registry.npmjs.org/");
    }
}
