declare const safeRequire: any;
declare const path: any;
declare const pkg: any;
declare const appName: any;
declare const appVersion: any;
declare const fs: any;
declare const v: Date;
declare const buildDate: () => string;
declare const defaultInject: () => string;
interface WriteOptions {
    injectData?: string | Function;
    position?: POSITION;
    fileName?: string;
    filePath?: string;
    content?: string;
}
declare enum POSITION {
    Banner = "banner",
    Footer = "footer"
}
/**
 * rules .css:
 *  - type = assets
 *  - data = source
 *
 * rules .js:
 *  - type = chunk
 *  - data = code
 */
declare const CSS_RULE: {
    type: string;
    data: string;
};
declare const JS_RULE: {
    type: string;
    data: string;
};
declare function writeBuildInfoInsteadRollUpOptionsForVite(opts?: WriteOptions): {
    name: string;
    generateBundle: (options: any, bundle: any, isWrite: boolean) => Promise<void>;
    writeBundle: () => Promise<void>;
};
declare function findAssetFileInjectCode(assetInfo: any, ext: string, injectData: string | Function, position: string): void;
