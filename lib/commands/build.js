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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollup_plugin_build_state_1 = __importDefault(require("../plugins/rollup-plugin-build-state"));
var plugin_legacy_1 = __importDefault(require("@vitejs/plugin-legacy"));
var plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
var plugin_babel_1 = require("@rollup/plugin-babel");
var rollupPluginWrite = require("../plugins/rollup-plugin-write");
var build = require("vite").build;
var path = require("path");
/* 仅对构建阶段有意义的插件，置于 rollupOptions.plugins 中 */
var buildPhasePlugins = [
    rollupPluginWrite(),
    plugin_babel_1.babel({
        babelHelpers: "bundled",
        exclude: "node_module/**",
    }),
    rollup_plugin_build_state_1.default(),
];
var tinyCliBuildConfig = {
    configFile: false,
    root: process.cwd(),
    base: "./",
    plugins: [plugin_vue_1.default()],
    build: {
        assetsInlineLimit: 60 * 1024,
        rollupOptions: {
            plugins: buildPhasePlugins,
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(process.cwd(), "src"),
        },
    },
};
module.exports = function (mode) {
    if (mode === void 0) { mode = "esnext" /* ESM */; }
    return __awaiter(void 0, void 0, void 0, function () {
        var lastTime, server, takeTime;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    process.env.LEGACY = mode;
                    lastTime = new Date().getTime();
                    console.log("\n✨ 编译开始...");
                    if (mode === "legacy" /* Leagacy */) {
                        (_a = tinyCliBuildConfig.plugins) === null || _a === void 0 ? void 0 : _a.push(plugin_legacy_1.default({
                            targets: ["defaults", "not IE 11"],
                        }));
                    }
                    return [4 /*yield*/, build(tinyCliBuildConfig)];
                case 1:
                    server = _b.sent();
                    takeTime = new Date().getTime() - lastTime;
                    console.log("\u2705 \u7F16\u8BD1\u5B8C\u6210\uFF0C\u5171\u8BA1\u8017\u65F6\uFF1A" + takeTime + "ms");
                    return [2 /*return*/];
            }
        });
    });
};
