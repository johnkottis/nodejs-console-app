#!/usr/bin/env node

const txtController = require('./controllers/txtController');

(async () => {
    try {
        await txtController.wordCount(process.argv[2]);
    } catch (err) {
        console.error("Error executing word count:", err);
    }
})();
