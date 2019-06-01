#!/usr/bin/env node

const argv = require("argv");

const args = argv.run();

const path = args.targets[0];

const { copyFiles } = require("../lib");

copyFiles(path);
