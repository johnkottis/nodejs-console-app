#!/usr/bin/env node

const txtController = require('./controllers/txtController');
const program = require('commander');

program
    .option('-b, --basic', 'Show basic data')
    .option('-f, --frequencies', 'Show frequencies data')
    .option('-x, --extended', 'Show extended data')
    .parse(process.argv);

if (program.args.length > 0) {
    (async () => {
        try {
            console.log('Processing file:', program.args[0]);
            await txtController.wordCount(program.args[0]);
        } catch (err) {
            console.error("Error executing command:", err);
        }
    })();
} else {
    console.log("Please type a valid command or input");
}
