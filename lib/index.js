const util = require("util");
const path = require("path");
const shell = require("shelljs");

const glob = util.promisify(require("glob"));

const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const copyFile = util.promisify(fs.copyFile);

module.exports.copyFiles = async function(boilerplate) {
  const config = await getConfig(boilerplate);

  if (!config || !config.files || !(config.files instanceof Array)) {
    throw new Error("files must be an array of path or glob pattern.");
  }

  const filess = await Promise.all(
    config.files
      .map(pattern => path.resolve(path.join(boilerplate, pattern)))
      .map(async pattern => {
        const paths = await glob(pattern);

        if (paths.length === 0) {
          throw new Error(`files for patterns: ${pattern} was not found.`);
        }

        return paths;
      })
  );

  const files = filess
    .reduce((pre, cur) => pre.concat(cur), [])
    .map(p => path.resolve(p));

  await Promise.all(
    files.map(async filePath => {
      const dest = path.join("./", path.relative(boilerplate, filePath));

      shell.mkdir("-p", path.dirname(dest));

      await copyFile(filePath, dest);
    })
  );

  console.log("File copied:\r\n", files);
};

async function getConfig(filePath) {
  const config = await readFile(resolveConfig(filePath), "utf8");

  return JSON.parse(config);
}
module.exports.getConfig = getConfig;

function resolveConfig(filePath) {
  return path.join(path.resolve(filePath), "boilerplate-files.json");
}
module.exports.resolveConfig = resolveConfig;
