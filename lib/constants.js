"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var version = require('../package.json').version;
// 存储模版的位置,mac下为HOME  ，windows中为 USERPROFILE
var downloadDirectory = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'] + "/.template";
module.exports = {
    version: version,
    downloadDirectory: downloadDirectory
};
//# sourceMappingURL=constants.js.map