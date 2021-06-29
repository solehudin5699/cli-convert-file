#! /usr/bin/env node
const { program } = require("commander");
const {convertFile} = require('../commands/convertfile')

program.usage("convert file format to json and plaintext ")
program.version('0.0.1')
program
    .argument("<directory>", "file directory" )
    .option("-t, --type <type>", "convert file to json or text")
    .option("-o, --option <newdirectory>", "save to new directory")
    .action(convertFile);



program.parse(process.argv)
