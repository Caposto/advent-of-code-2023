const fs = require('fs').promises;
const readline = require('readline');

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    console.log(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile('input.txt')

// Combine first digit and last digit to form 2 digit number

// REGEX to find digits? For each string, iterate till you find the first and last digits

// Maintain a sum of all the digits and return that 