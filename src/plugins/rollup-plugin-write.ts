//import { name as appName, version as appVersion} from "./package.json"
const path = require("path");
const appName = require(`${path.resolve(process.cwd(), "package.json")}`).name;
const appVersion = require(`${path.resolve(
  process.cwd(),
  "package.json"
)}`).version;
const fs = require("fs-extra");

const v = new Date();
const buildDate = () => {
  return `${v.getFullYear()}-${
    v.getMonth() + 1
  }-${v.getDate()} ${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
};
const defaultInject = () => {
  return (
    "/* @App version: " +
    appVersion +
    " " +
    "@Build Date: " +
    buildDate() +
    "*/"
  );
};

interface WriteOptions {
  injectData?: string | Function;
  position?: POSITION;
  fileName?: string;
  filePath?: string;
  content?: string;
}
enum POSITION {
  Banner = "banner",
  Footer = "footer",
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
const CSS_RULE = {
  type: "asset",
  data: "source",
};
const JS_RULE = {
  type: "chunk",
  data: "code",
};

function writeBuildInfoInsteadRollUpOptionsForVite(opts: WriteOptions = {}) {
  const {
    injectData = defaultInject,
    position = "banner",
    fileName = `${appName}-v${appVersion}.txt`,
    filePath = "./docs",
    content = appName + appVersion,
  } = opts;
  return {
    name: "WriteBuildInfo",
    generateBundle: async (options: any, bundle: any, isWrite: boolean) => {
      if (isWrite) {
        Reflect.ownKeys(bundle).forEach((name) => {
          findAssetFileInjectCode(bundle[name], "js", injectData, position);
          findAssetFileInjectCode(bundle[name], "css", injectData, position);
        });
      }
    },
    writeBundle: async () => {
      setImmediate(async () => {
        await fs.remove(`${filePath}/${fileName}`);
        await fs.ensureDir(filePath);
        await fs
          .writeFile(filePath + "/" + fileName, content, { flag: "a" })
          .catch((err: Error) => {
            if (err) {
              console.log(err);
            }
          });
      });
    },
  };
}

function findAssetFileInjectCode(
  assetInfo: any,
  ext: string,
  injectData: string | Function,
  position: string
) {
  if (
    ext === "js" &&
    assetInfo.type === JS_RULE.type &&
    /\.js$/.test(assetInfo.fileName)
  ) {
    if (position === "banner") {
      typeof injectData === "function"
        ? Reflect.set(
            assetInfo,
            JS_RULE.data,
            injectData() + assetInfo[JS_RULE.data]
          )
        : Reflect.set(
            assetInfo,
            JS_RULE.data,
            injectData + assetInfo[JS_RULE.data]
          );
    }
    if (position === "footer") {
      typeof injectData === "function"
        ? Reflect.set(
            assetInfo,
            JS_RULE.data,
            assetInfo[JS_RULE.data] + injectData()
          )
        : Reflect.set(
            assetInfo,
            JS_RULE.data,
            assetInfo[JS_RULE.data] + injectData
          );
    }
  }
  if (
    ext === "css" &&
    assetInfo.type === CSS_RULE.type &&
    /\.css$/.test(assetInfo.fileName)
  ) {
    if (position === "banner") {
      typeof injectData === "function"
        ? Reflect.set(
            assetInfo,
            CSS_RULE.data,
            injectData() + assetInfo[CSS_RULE.data]
          )
        : Reflect.set(
            assetInfo,
            CSS_RULE.data,
            injectData + assetInfo[CSS_RULE.data]
          );
    }
    if (position === "footer") {
      typeof injectData === "function"
        ? Reflect.set(
            assetInfo,
            CSS_RULE.data,
            assetInfo[CSS_RULE.data] + injectData()
          )
        : Reflect.set(
            assetInfo,
            CSS_RULE.data,
            assetInfo[CSS_RULE.data] + injectData
          );
    }
  }
}

module.exports = writeBuildInfoInsteadRollUpOptionsForVite;
