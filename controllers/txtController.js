/**
 * WordCount Controller
 * Version: 0.0.2
 * Author: John Kottis
 */

const fs = require('fs').promises;
const recursive = require('recursive-readdir');

/**
 * Converts an object to a string with property-value pairs.
 * @param {Object} inputObject - The input object.
 * @return {String} outputString - The string representation of the object.
 */
const prettifyObject = (inputObject) => {
    return Object.entries(inputObject)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
};

/**
 * Checks if the input is a directory or a file.
 * @param {String} userInput - The input directory or file path.
 * @return {Boolean} - True if it is a directory, false if it is a file.
 */
const userInputType = async (userInput) => {
    const stats = await fs.lstat(userInput);
    return stats.isDirectory();
};

/**
 * Counts the number of lines in a text file.
 * @param {String} text - The content of the text file.
 * @return {Number} - The number of lines.
 */
const countLines = (text) => text.split("\n").length;

/**
 * Counts the number of words in a text file.
 * @param {String} text - The content of the text file.
 * @return {Number} - The number of words.
 */
const countWords = (text) => text.split(/\s+/).filter(word => word.length > 0).length;

/**
 * Handles text processing based on the input options.
 * @param {String} filePath - The path of the text file.
 * @param {String} content - The content of the text file.
 */
const textFileHandler = (filePath, content) => {
    const wordCount = countWords(content);
    const lineCount = countLines(content);

    console.log(`File: ${filePath}`);
    console.log(`Lines: ${lineCount}`);
    console.log(`Words: ${wordCount}`);
};

/**
 * Processes a text file, reading its content and handling it.
 * @param {String} filePath - The path of the text file.
 */
const processTextFile = async (filePath) => {
    if (filePath.endsWith('.txt')) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            textFileHandler(filePath, content);
        } catch (err) {
            console.error(`Error reading file ${filePath}:`, err);
        }
    } else {
        console.log("Input is not a text file!");
    }
};

/**
 * Reads files and calls textFileHandler for each text file found.
 * @param {String} inputPath - The file or directory path.
 */
const wordCount = async (inputPath) => {
    try {
        if (await userInputType(inputPath)) {
            // Input is a directory
            const allFiles = await recursive(inputPath);
            for (const file of allFiles) {
                await processTextFile(file);
            }
        } else {
            // Input is a file
            await processTextFile(inputPath);
        }
    } catch (err) {
        console.error(`Error processing input path ${inputPath}:`, err);
    }
};

module.exports = {
    wordCount,
};
