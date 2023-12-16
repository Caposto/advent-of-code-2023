async function readInput(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const lineQueue = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Default 100 ms
  });

  for await (const line of lineQueue) {
    // Perform some operation on each line
    console.log(line);
  }
}