/* Parse input into a 2D matrix
 * Adjacency defined as any number to the left, right, top, bottom, or diagonal of the number
 * Only 1 digit in the whole number has to be adjacent to a non-numerical symbol
 * Number of islands BFS?
 */

const fs = require('fs');
const readline = require('readline');

/* Time Complexity: O(V+E)
 * FOR EACH ROW:
 *  FOR EACH COL:
 *    Run BFS if digit is encountered
 *    Add (row, col) coordinates to a visited set - this set should contain past visited number AND symbols
 */ 

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

createGraphFromInput("day_3_input.txt")
  .then(function(result) {
    console.log(result);
  }
);