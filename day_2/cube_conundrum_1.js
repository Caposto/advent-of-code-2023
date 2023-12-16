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
    games = line.split("; ");
    games = [...games[0].split(": "), ...games.slice(1)];
    console.log(games);

    let currentGameId = Number(games[0].split(" ")[1]);
    let validGame = true;

    // Split each turn into an array of 3 objects [red, green, blue]

    if (validGame) {
      idSum += currentGameId;
    }

  }

  return idSum;
}

count_possible_games("day_2_input.txt");