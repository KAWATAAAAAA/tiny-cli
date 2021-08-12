export {};

// 存储模版的位置,mac下为HOME  ，windows中为 USERPROFILE
const downloadDirectory: string = `${
  process.env[process.platform === "darwin" ? "HOME" : "USERPROFILE"]
}/.template`;
module.exports = {
  downloadDirectory,
};
