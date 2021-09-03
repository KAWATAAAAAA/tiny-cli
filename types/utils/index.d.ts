declare interface Utils {
    safeRequire: (path: string) => null | Record<string, any>;
    each: (obj: object, iteratorFn: (...args: any) => void) => void;
}
declare const _default: Utils;
export default _default;
