"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var path = require("path");
var axios = require("axios");
var ora = require("ora");
var Inquirer = require("inquirer");
var chalk = require("chalk");
var MetalSmith = require("metalsmith"); // 遍历文件夹 找需不需要渲染
var promisify = require("util").promisify;
var downloadGitRepo = promisify(require("download-git-repo"));
var downloadDirectory = require("../constants").downloadDirectory;
var render = promisify(require("consolidate").ejs).render;
/**
 * create的所有逻辑 haya create <app-name>
 * 拉取仓库所有项目，列出让用户选 安装哪个项目 haya create <app-name>
 * 选完后 在显示所有的版本号 1.0
 * 可能还需要用户配置一些数据 来结合生成 app 模板
 * */
// 1.获取项目列表
var fetchRepoList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("https://api.github.com/orgs/Tiny-CLI-Template/repos")];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
// 2.获取项目的tag列表
var fetchTagList = function (repo) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get("https://api.github.com/repos/Tiny-CLI-Template/" + repo + "/tags")];
            case 1:
                data = (_a.sent()).data;
                return [2 /*return*/, data];
        }
    });
}); };
// 3.封装执行函数时的loading效果
var waitFnloading = function (fn, message) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var spinner, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spinner = ora(message);
                        spinner.start();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, fn.apply(void 0, args)];
                    case 2:
                        result = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        e_1 = _a.sent();
                        console.error("\n", chalk.red(e_1));
                        throw new Error(e_1);
                    case 4:
                        spinner.succeed();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
};
// 执行下载模板，将模板下载到临时目录中，并将存放模板的目录返回
var download = function (repo, tag) { return __awaiter(void 0, void 0, void 0, function () {
    var api, dest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                api = "Tiny-CLI-Template/" + repo;
                if (tag) {
                    api += "#" + tag;
                }
                dest = downloadDirectory + "/" + repo;
                return [4 /*yield*/, downloadGitRepo(api, dest)];
            case 1:
                _a.sent();
                return [2 /*return*/, dest];
        }
    });
}); };
// 前置目录检查
var beforeCreate = function (projectName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return __awaiter(void 0, void 0, void 0, function () {
                var CREATE_ACTION, ACTIONS;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!projectName) {
                                console.error(chalk.red("  Missing required argument"), chalk.yellow("<app-name>"));
                                resolve({ exit: true });
                                return [2 /*return*/];
                            }
                            if (!fs.pathExistsSync(projectName)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Inquirer.prompt({
                                    name: "CREATE_ACTION",
                                    type: "list",
                                    message: "Target directory " + chalk.red(path.resolve() + "/" + projectName) + " already exists. Pick an action",
                                    choices: ["Overwrite", "Merge", "Cancel"],
                                })];
                        case 1:
                            CREATE_ACTION = (_a.sent()).CREATE_ACTION;
                            ACTIONS = {
                                Overwrite: function () {
                                    fs.removeSync(projectName);
                                    resolve({ exit: false });
                                },
                                Merge: function () {
                                    resolve({ exit: false });
                                },
                                Cancel: function () {
                                    resolve({ exit: true });
                                },
                            };
                            ACTIONS[CREATE_ACTION]();
                            return [3 /*break*/, 3];
                        case 2:
                            resolve({ exit: false });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
module.exports = function (projectName) { return __awaiter(void 0, void 0, void 0, function () {
    var res, repos, repo, tags, _a, tag, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, beforeCreate(projectName)];
            case 1:
                res = _b.sent();
                if (res.exit) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, waitFnloading(fetchRepoList, "Fetching template ....")()];
            case 2:
                repos = _b.sent();
                repos = repos.map(function (item) { return item.name; });
                return [4 /*yield*/, Inquirer.prompt({
                        name: "repo",
                        type: "list",
                        message: "\u8BF7\u9009\u62E9\u4E00\u4E2A" + chalk.red("模板") + "\u521B\u5EFA\u9879\u76EE",
                        choices: repos,
                    })];
            case 3:
                repo = (_b.sent()).repo;
                return [4 /*yield*/, waitFnloading(fetchTagList, "Fetching tags ....")(repo)];
            case 4:
                tags = _b.sent();
                tags = tags.map(function (item) { return item.name; });
                return [4 /*yield*/, Inquirer.prompt({
                        name: "tag",
                        type: "list",
                        message: "\u8BF7\u9009\u62E9\u6A21\u677F" + chalk.red("版本号") + "[tag]",
                        choices: tags,
                    })];
            case 5:
                _a = (_b.sent()).tag, tag = _a === void 0 ? "" : _a;
                return [4 /*yield*/, waitFnloading(download, "download template...")(repo, tag)];
            case 6:
                result = _b.sent();
                if (!!fs.pathExistsSync(path.join(result, "ask.js"))) return [3 /*break*/, 8];
                return [4 /*yield*/, fs.copy(result, path.resolve(projectName))];
            case 7:
                _b.sent();
                return [3 /*break*/, 10];
            case 8: 
            // 复杂的需要模版渲染，渲染后再拷贝
            return [4 /*yield*/, new Promise(function (resolve, reject) {
                    MetalSmith(__dirname) // render后生成位置
                        .source(result) //源文件目录
                        .destination(path.resolve(projectName))
                        /* 拿用户输入信息 */
                        .use(function (files, metal, done) { return __awaiter(void 0, void 0, void 0, function () {
                        var args, obj, meta;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    args = require(path.join(result, "ask.js"));
                                    return [4 /*yield*/, Inquirer.prompt(args)];
                                case 1:
                                    obj = _a.sent();
                                    meta = metal.metadata();
                                    Object.assign(meta, obj);
                                    delete files["ask.js"];
                                    done();
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        /* 拿用户输入信息做渲染 */
                        .use(function (files, metal, done) {
                        var obj = metal.metadata();
                        Reflect.ownKeys(files).forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
                            var content;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(file.endsWith(".json") || file.endsWith(".html"))) return [3 /*break*/, 2];
                                        content = files[file].contents.toString();
                                        if (!(content.includes("<%=") && content.includes("%>"))) return [3 /*break*/, 2];
                                        return [4 /*yield*/, render(content, obj)];
                                    case 1:
                                        content = _a.sent();
                                        files[file].contents = Buffer.from(content); // 渲染
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        done();
                    })
                        .build(function (err) {
                        if (err) {
                            reject();
                        }
                        else {
                            resolve("");
                        }
                    });
                })];
            case 9:
                // 复杂的需要模版渲染，渲染后再拷贝
                _b.sent();
                _b.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}); };
