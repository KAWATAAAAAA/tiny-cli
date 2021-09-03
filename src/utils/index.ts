declare interface Utils {
  safeRequire: (path: string) => null | Record<string, any>;
  each: (obj: object, iteratorFn: (...args: any) => void) => void;
}
const safeRequire = (path: string) => {
  try {
    return require(path);
  } catch (e) {
    return null;
  }
};

function each(obj: object, iteratorFn: (...args: any) => void) {
  Reflect.ownKeys(obj).forEach((key, index, array) => {
    iteratorFn({
      key,
      index,
      array,
      originObject: obj,
    });
  });
}

// module.exports = {
//   safeRequire,
//   each
// };

export default {
  safeRequire,
  each,
} as Utils;
