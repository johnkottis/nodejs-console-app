
# WordCount

## Introduction

This project is a command-line tool that reads and processes words from text files or directories. It provides basic word counting functionality as well as extended options for frequency analysis and more.

## Installation, Usage, Example Usage, and License

To install the dependencies, run the following command:

```bash
npm install
```

This will install the necessary packages specified in `package.json`.

You can run the tool using the following command:

```bash
node server.js [options] <file_or_directory>
```

Options include:

- `-b, --basic`: Show basic data (e.g., word count, line count).
- `-f, --frequencies`: Show word frequency data.
- `-x, --extended`: Show extended data analysis.

Example usage:

```bash
node server.js -b ./sample_text.txt
```

This will display the basic word count and line count for `textfile.txt`.

This project is licensed under the MIT License.
