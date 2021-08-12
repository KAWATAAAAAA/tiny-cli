const safeRequire = (path: string) => {
  try {
    return require(path);
  } catch (e) {
    return null;
  }
};
module.exports = {
  safeRequire,
};

export {};
