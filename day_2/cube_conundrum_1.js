/* Determine which games would have been possible if the bag contained only 
 * 12 red cubes, 13 green cubes, and 14 blue cubes
 * Sum the ID's (Game Number) of all of these possible games
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

  let idSum = 0;

  for await (const line of lineQueue) {
    // Split input into each game based on semicolon
    let games = line.split("; ");
    games = [...games[0].split(": "), ...games.slice(1)];

    let currentGameId = Number(games[0].split(" ")[1]);
    let validGame = true;

    // Compare the cube quantities of each game [red, green, blue]
    for await (const game of games.slice(1)) { // Remove first item since that is the Game ID
      let cubeQuantities = game.split(", ");

      for await (const quantity of cubeQuantities) {
        let individualQuantity = quantity.split(" ");
        let amount = individualQuantity[0];
        let color = individualQuantity[1];

        if (color == "red" && Number(amount) > 12) {
          validGame = false;
        }
        else if (color == "green" && Number(amount) > 13) {
          validGame = false;
        }
        else if (color == "blue" && Number(amount) > 14) {
          validGame = false;
        }
      }
    }

    if (validGame) {
      console.log("ID: " + currentGameId)
      idSum += currentGameId;
    }

  }

  return idSum;
}

// FIXME: Is this the best wayy to handle a promise?
count_possible_games("day_2_input.txt").then(function(result){
  console.log(result);
});

// ANSWER: 2006