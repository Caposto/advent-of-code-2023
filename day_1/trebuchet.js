const fs = require('fs');
const readline = require('readline');

const digits = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"])

// Part 2: Replace all words with digits
// The reason you don't just replace with the digits is because the order in which the digits should be replaced is never established
// i.e the letters of "three" specifically the "t" and "e" might have been part of another number
function replaceWithDigits(line) {
  let newLine = line;
  newLine = newLine.replace(/one/g, "o1e");
  newLine = newLine.replace(/two/g, "t2o");
  newLine = newLine.replace(/three/g, "t3e");
  newLine = newLine.replace(/four/g, "4");
  newLine = newLine.replace(/five/g, "5e");
  newLine = newLine.replace(/six/g, "6");
  newLine = newLine.replace(/seven/g, "7n");
  newLine = newLine.replace(/eight/g, "e8");
  newLine = newLine.replace(/nine/g, "9");
  return newLine;
}

async function processInputByLine(filePath) {
  let sum = 0;
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const newLine = replaceWithDigits(line);
    const newLineReversed = newLine.split("").reverse().join("");
    let first;
    let second;

    for await (const ch of newLine) {
      if (digits.has(ch)) {
        first = ch;
        break;
      }
    }

    for await (const ch of newLineReversed) {
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

console.log(processInputByLine("day_1_input.txt")); 

// Part 1 : 55712
// Part 2 : 55413 (Mine is Wrong)