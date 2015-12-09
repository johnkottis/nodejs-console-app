/**
 * WordCount Controller
 * Version: 0.0.1
 * Author: John Kottis
 */
var fs = require('fs'),
    recursive = require('recursive-readdir'),
    inputTextOrDir = process.argv.slice(3),
    infoLevel = process.argv.slice(2)[0],

    /**
     * Converts an object to a string with property values pairs
     * @param {Object} inputObject is the input object.
     * @return {String} outputString with property values pairs .
     */
    pritifyObject = function(inputObject) {
        var outputString = '';
        for (var inputPair in inputObject) {
            outputString += inputPair + ': ' + inputObject[inputPair] + '\n';
        }
        return outputString;
    },

    /**
     * Checks if the input is a file or a directory
     * @param {String} userInput is the input directory of file.
     * @return {Boolean} true if it is a directory, false if it is a file.
     */
    userInputType = function(userInput) {
        return fs.lstatSync(userInput).isDirectory();
    },

    /**
     * Counts number of lines
     * @param {String} txtFile is the content text.
     * @return {Number} of lines.
     */
    counterLines = function(txtFile) {
        return txtFile.toString().split("\n").length;
    },

    /**
     * Counts number of words
     * @param {String} txtFile is the content text.
     * @return {Object} with total number of words and pairs words/ freequency.
     */
    counterWords = function(txtFile) {
        var dictionary = {},
            words = txtFile
            .replace(/[^\w\s]/gi, '')
            .toLowerCase()
            .split(" ");

        words.forEach(function(word) {
            if (!(dictionary.hasOwnProperty(word))) {
                dictionary[word] = 0;
            }
            dictionary[word]++;
        });

        return {
            sum: words.length,
            dictionary: dictionary
        };
    },

    /**
     * Counts number of characters
     * @param {String} txtFile is the content text.
     * @return {Number} of characters.
     */
    counterChars = function(txtFile) {
        return txtFile.length;
    },

    /**
     * Creates user friendly message
     * @param {String} fileName is the file name.
     * @param {String} fileCharsSum is the sum of characters.
     * @param {String} fileWordsSum is the sum of words.
     * @param {String} fileDictionary is the pairs words/ freequency.
     * @param {String} fileLinesSum is the sum of lines.
     * @return {Object} of user frinedly messages.
     */
    messageGenerator = function(fileName, fileCharsSum, fileWordsSum, fileDictionary, fileLinesSum) {
        return {
            messageTextFile: "Report for file: " + fileName,
            messageCharsCount: "Total number of characters is " + fileCharsSum,
            messageWordsCount: "Total number of words is " + fileWordsSum,
            messageLinesCount: "Total number of lines: " + fileLinesSum,
            messageDictionary: "Detail report: " + pritifyObject(fileDictionary)
        }
    },

    /**
     * Converts an object to a string
     * @param {String} fileName is the file name.
     * @param {String} fileContent is the log file message.
     */
    writerLogs = function(fileName, fileContent) {
        var logFileName = './wordCountLogs/' + Math.floor(Date.now() / 1000) + fileName.split("\\").pop();
        fs.writeFile(logFileName, fileContent, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log(logFileName + " was saved!");
        });
    },

    /**
     * Handles text file/ directory actions
     * Provides different information based on user's request
     * @param {String} fileName is the file name.
     * @param {String} handledText is the parsed text.
     */
    textFileHandler = function(fileName, handledText) {
        var resultWordsCount = counterWords(handledText).sum,
            resultCharsCount = counterChars(handledText),
            resultDictionary = counterWords(handledText).dictionary,
            resultLinesCount = counterLines(handledText),
            userFriendlyMsg,
            userReport = messageGenerator(fileName, resultCharsCount, resultWordsCount, resultDictionary, resultLinesCount);

        switch (infoLevel) {
            case "--basic":
                userFriendlyMsg = userReport.messageWordsCount;
                break;

            case "--frequencies":
                userFriendlyMsg = userReport.messageDictionary;
                break;

            default:
                userFriendlyMsg = userReport.messageTextFile + "\n" +
                    userReport.messageWordsCount + "\n" +
                    userReport.messageCharsCount + "\n" +
                    userReport.messageLinesCount + "\n" +
                    userReport.messageDictionary;
        }

        // Prints a user friendly message to the console
        console.log(userFriendlyMsg);

        // Creates the log file in the logs directory
        writerLogs(fileName, userFriendlyMsg);

    };

/**
 * Reads files and calls textFileHandler within text files loops
 * @param {String} textFile is the file name.
 */
function processTextFile(textFile) {
    // Check if file is a text document
    if (textFile.split(".").pop() === "txt") {
        fs.readFile(textFile, 'utf8', function(err, parsedText) {
            if (err) {
                return console.log(err);
            }
            textFileHandler(textFile, parsedText);
        });
    } else return console.log("Input is not a text file!");
}


/**
 * Reads files and calls textFileHandler within text files loops
 * @param {String} textFiles is the file path or the directory.
 */
module.exports.wordCount = function(textFiles) {

    // Case: Input is a directory
    if (userInputType(inputTextOrDir[0])) {
        // List all text files in directory and in subdirectories
        recursive(inputTextOrDir[0], function(err, allFiles) {
            if (err) {
                return console.log(err);
            }
            // Files is an array of filename 
            for (var fileInDir = 0; fileInDir < allFiles.length; fileInDir++) {
                processTextFile(allFiles[fileInDir]);
            }
        });
    }

    // Case: Input is a file
    else {
        // Check if given file is a text document
        if (inputTextOrDir[0].split(".").pop() === "txt") {
            fs.readFile(inputTextOrDir[0], 'utf8', function(err, parsedText) {
                if (err) {
                    return console.log(err);
                }
                textFileHandler(inputTextOrDir[0], parsedText);
            });
        } else return console.log("Input is not a text file!");

    }
};