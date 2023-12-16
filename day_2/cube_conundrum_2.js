/* The power of a set of cubes is equal to the numbers of 
 * red, green, and blue cubes multiplied together. The 
 * power of the minimum set of cubes in game 1 is 48. In 
 * games 2-5 it was 12, 1560, 630, and 36, respectively. 
 * Adding up these five powers produces the sum 2286.
 */ 

const fs = require('fs');
const readline = require('readline');

// T: O(n * m) n is the number of games and m is the length of the logngest game
async function count_possible_games(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const lineQueue = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, 
  });

  let minimumSetSum = 0;

  for await (const line of lineQueue) {
    // Split input into each game based on semicolon
    let games = line.split("; ");
    games = [...games[0].split(": "), ...games.slice(1)];

    // Find the max red, green, and blue cubes. Cube that and add to result
    let red_max = 0;
    let green_max = 0;
    let blue_max = 0;

    for await (const game of games.slice(1)) { // Remove first item since that is the Game ID
      let cubeQuantities = game.split(", ");

      for await (const quantity of cubeQuantities) {
        let individualQuantity = quantity.split(" ");
        let amount = Number(individualQuantity[0]);
        let color = individualQuantity[1];

        if (color == "red" && amount > red_max) {
          red_max = amount;
        }
        else if (color == "green" && amount > green_max) {
          green_max = amount;
        }
        else if (color == "blue" && amount > blue_max) {
          blue_max = amount;
        }
      }
    }

    let powerSet = red_max * green_max * blue_max;
    minimumSetSum += powerSet;
  }

  return minimumSetSum;
}

count_possible_games("day_2_input.txt").then(function(result){
  console.log(result);
});

// ANSWER : 84911