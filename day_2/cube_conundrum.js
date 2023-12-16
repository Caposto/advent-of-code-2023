/* Determine which games would have been possible if the bag contained only 
 * 12 red cubes, 13 green cubes, and 14 blue cubes
 * Sum the ID's (Game Number) of all of these possible games
 */ 

const fs = require('fs');
const readline = require('readline');

async function count_possible_games(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const lineQueue = readline.createInterface({
    input: fileStream,
    // crlfDelay: Infinity, 
  });

  for await (const line of lineQueue) {
    // Perform some operation on each line
    console.log(line);
  }
}

// Read each line 
// Split based on semicolon
// Split each turn into an array of 3 objects [red, green, blue]
// T: O(n * m) n is the number of games and m is the length of the logngest game