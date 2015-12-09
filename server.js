#! /usr/bin/env node

var txtController = require('./controllers/txtController');
var program = require('commander');

program
    .option('-b, --basic', 'Show basic data')
    .option('-f, --frequencies', 'Show frequencies data')
    .option('-x, --extended', 'Show extended data')
    .parse(process.argv);

if (program.basic) txtController.wordCount();
else if (program.frequencies) txtController.wordCount();
else if (program.extended) txtController.wordCount();
else console.log("Please type a valid command or input");