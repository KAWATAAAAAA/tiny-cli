"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var safeRequire = function (path) {
    try {
        return require(path);
    }
    catch (e) {
        return null;
    }
};
module.exports = {
    safeRequire: safeRequire,
};
