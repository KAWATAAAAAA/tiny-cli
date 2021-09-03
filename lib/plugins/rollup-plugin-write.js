"use strict";
//import { name as appName, version as appVersion} from "./package.json"
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../utils/index"));
var path = require("path");
var pkg = index_1.default.safeRequire("" + path.resolve(process.cwd(), "package.json"));
var appName = pkg ? pkg.name : "demo";
var appVersion = pkg ? pkg.version : "0.0.0";
var fs = require("fs-extra");
var v = new Date();
var buildDate = function () {
    return v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + v.getDate() + " " + v.getHours() + ":" + v.getMinutes() + ":" + v.getSeconds();
};
var defaultInject = function () {
    return ("/* @App version: " +
        appVersion +
        " " +
        "@Build Date: " +
        buildDate() +
        "*/");
};
var POSITION;
(function (POSITION) {
    POSITION["Banner"] = "banner";
    POSITION["Footer"] = "footer";
})(POSITION || (POSITION = {}));
/**
 * rules .css:
 *  - type = assets
 *  - data = source
 *
 * rules .js:
 *  - type = chunk
 *  - data = code
 */
var CSS_RULE = {
    type: "asset",
    data: "source",
};
var JS_RULE = {
    type: "chunk",
    data: "code",
};
function writeBuildInfoInsteadRollUpOptionsForVite(opts) {
    var _this = this;
    if (opts === void 0) { opts = {}; }
    var _a = opts.injectData, injectData = _a === void 0 ? defaultInject : _a, _b = opts.position, position = _b === void 0 ? "banner" : _b, _c = opts.fileName, fileName = _c === void 0 ? appName + "-v" + appVersion + ".txt" : _c, _d = opts.filePath, filePath = _d === void 0 ? "./docs" : _d, _e = opts.content, content = _e === void 0 ? appName + appVersion : _e;
    return {
        name: "WriteBuildInfo",
        generateBundle: function (options, bundle, isWrite) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isWrite) {
                    Reflect.ownKeys(bundle).forEach(function (name) {
                        findAssetFileInjectCode(bundle[name], "js", injectData, position);
                        findAssetFileInjectCode(bundle[name], "css", injectData, position);
                    });
                }
                return [2 /*return*/];
            });
        }); },
        writeBundle: function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setImmediate(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fs.remove(filePath + "/" + fileName)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, fs.ensureDir(filePath)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, fs
                                        .writeFile(filePath + "/" + fileName, content, { flag: "a" })
                                        .catch(function (err) {
                                        if (err) {
                                            console.log(err);
                                        }
                                    })];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); },
    };
}
function findAssetFileInjectCode(assetInfo, ext, injectData, position) {
    if (ext === "js" &&
        assetInfo.type === JS_RULE.type &&
        /\.js$/.test(assetInfo.fileName)) {
        if (position === "banner") {
            typeof injectData === "function"
                ? Reflect.set(assetInfo, JS_RULE.data, injectData() + assetInfo[JS_RULE.data])
                : Reflect.set(assetInfo, JS_RULE.data, injectData + assetInfo[JS_RULE.data]);
        }
        if (position === "footer") {
            typeof injectData === "function"
                ? Reflect.set(assetInfo, JS_RULE.data, assetInfo[JS_RULE.data] + injectData())
                : Reflect.set(assetInfo, JS_RULE.data, assetInfo[JS_RULE.data] + injectData);
        }
    }
    if (ext === "css" &&
        assetInfo.type === CSS_RULE.type &&
        /\.css$/.test(assetInfo.fileName)) {
        if (position === "banner") {
            typeof injectData === "function"
                ? Reflect.set(assetInfo, CSS_RULE.data, injectData() + assetInfo[CSS_RULE.data])
                : Reflect.set(assetInfo, CSS_RULE.data, injectData + assetInfo[CSS_RULE.data]);
        }
        if (position === "footer") {
            typeof injectData === "function"
                ? Reflect.set(assetInfo, CSS_RULE.data, assetInfo[CSS_RULE.data] + injectData())
                : Reflect.set(assetInfo, CSS_RULE.data, assetInfo[CSS_RULE.data] + injectData);
        }
    }
}
module.exports = writeBuildInfoInsteadRollUpOptionsForVite;
