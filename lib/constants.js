"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 存储模版的位置,mac下为HOME  ，windows中为 USERPROFILE
var downloadDirectory = process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"] + "/.template";
module.exports = {
    downloadDirectory: downloadDirectory,
};
//# sourceMappingURL=constants.js.map