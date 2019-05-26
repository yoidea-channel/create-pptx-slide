#!/usr/bin/env node

const chalk = require('chalk');
const program = require("commander");
const fs = require('fs');
const git = require('simple-git/promise');

const repository = "https://github.com/yoidea-channel/slide-template.git";
const cwd = process.cwd();
let projectName = "create-pptx-slide";

program
  .version("1.0.0")
  .arguments('<project-directory>')
  .action(name => {
    projectName = name;
  })
  .parse(process.argv);

const projectDir = `${cwd}/${projectName}`;
console.log(chalk.blue("Cloning files..."));
if (!fs.existsSync(projectDir)){
  fs.mkdirSync(projectDir);
};
git()
  .clone(repository, projectDir)
  .then(() => {
    if (!fs.existsSync(projectDir)){
      git(projectDir).removeRemote("origin");
    }
    console.log(chalk.green("Done!"));
  });