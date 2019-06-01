import test from "ava";

const { getConfig, resolveConfig } = require("../lib");
const path = require("path");

test("get config test.", async t => {
  t.deepEqual(await getConfig(`${__dirname}/../test-folder/from`), {
    files: [
      "src/index.js",
      "src/index.html",
      "src/**/*.css",
      ".babelrc",
      ".gitignore",
      "package.json",
      "webpack.config.js",
      "webpack.config.dev.js",
      "webpack.config.build.js"
    ]
  });
});

test("resolve config path test.", t => {
  t.is(
    resolveConfig(`${__dirname}/../test-folder/from`),
    path.join(__dirname, "../test-folder/from/boilerplate-files.json")
  );
});
