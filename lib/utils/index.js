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
function each(obj, iteratorFn) {
    Reflect.ownKeys(obj).forEach(function (key, index, array) {
        iteratorFn({
            key: key,
            index: index,
            array: array,
            originObject: obj,
        });
    });
}
// module.exports = {
//   safeRequire,
//   each
// };
exports.default = {
    safeRequire: safeRequire,
    each: each,
};
