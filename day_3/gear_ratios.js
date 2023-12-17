/* Parse input into a 2D matrix
 * Adjacency defined as any number to the left, right, top, bottom, or diagonal of the number
 * Only 1 digit in the whole number has to be adjacent to a non-numerical symbol
 * Number of islands BFS?
 */

const fs = require('fs');
const readline = require('readline');

async function createGraphFromInput(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const lineQueue = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Default 100 ms
  });

  let gearGraph = [];

  for await (const line of lineQueue) {
    const graphRow = line.split("");
    gearGraph.push(graphRow);
  }

  return gearGraph;
}

/* Time Complexity: O(V+E)
 * FOR EACH ROW:
 *  FOR EACH COL:
 *    Run BFS on one level if symbol is encountered
 *    Add (row, col) coordinates to a visited set - this set should contain past visited part numbers AND symbols
 */ 
function sumEngineParts(engineSchematic) {
  const ROWS = engineSchematic.length;
  const COLS = engineSchematic[0].length;
  const visited = new Set();
  const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  // [row, col] : right, left, up, down, upper/right, bottom/right, upper/left, bottom/left
  const directions =[[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  let partSum = 0;

  // Helper function that gets the full engine number given a row from the schematic and the index detected
  function getFullEngineNumber(engineSchematicRow, c, r) {
    let left = c;
    let right = c;

    while (left - 1 > 0 && digits.has(engineSchematicRow[left - 1])) {
      visited.add((r, left));
      left--; 
    }

    while (right + 1 < COLS && digits.has(engineSchematicRow[right + 1])) {
      visited.add((r, right));
      right++; 
    }

    const enginePartNumber = Number(engineSchematicRow.slice(left, right + 1).join(''));

    return enginePartNumber;
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Check if the current part is a symbol
      if (engineSchematic[r][c] != "." && !digits.has(engineSchematic[r][c])) {
        for (let i = 0; i < directions.length; i++) {
          let new_r = r + directions[i][0];
          let new_c = c + directions[i][1];
          const isNumber = digits.has(engineSchematic[new_r][new_c]);
          if (visited.has((new_r, new_c)) || new_r < 0 || new_r >= ROWS || new_c < 0 || new_c >= COLS) {
            continue;
          }
          if (digits.has(engineSchematic[new_r][new_c])) {
            partSum += getFullEngineNumber(engineSchematic[new_r], new_c, new_r);
          }
        }
      }
    }
  }

  return partSum;
}

createGraphFromInput("smaller_input.txt")
  .then(function(result) {
    console.log(sumEngineParts(result));
  }
);

// ANSWER: 47571 (TOO LOW)