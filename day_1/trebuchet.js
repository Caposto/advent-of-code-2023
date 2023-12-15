const fs = require('fs');
const readline = require('readline');

const digits = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"])

async function processInputByLine(filePath) {
  let sum = 0;
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    let first;
    let second;

    for await (const ch of line) {
      if (digits.has(ch)) {
        first = ch;
        break;
      }
    }

    for await (const ch of line.split("").reverse().join("")) {
      if (digits.has(ch)) {
        second = ch;
        break;
      }
    }

    // Combine first digit and last digit to form 2 digit number
    let number = first + second;
    sum += Number(number)
  }
  console.log(sum);
}

console.log(processInputByLine("input.txt")); // Answer 55712