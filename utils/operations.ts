export const transpoleMatrixIntoString = (
  message: string,
  width: number,
  height: number
): string => {
  let matrix: string[][] = [];
  let stringCount = 0;

  // Filling the matrix with the message
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let x = 0; x < width; x++) {
      matrix[i][x] = message[stringCount] || " ";
      stringCount++;
    }
  }

  let messageToReturn = "";

  // Building the string to return from transpoling the matrix
  matrix[0].map((col, c) =>
    matrix.map((row, r) => (messageToReturn += matrix[r][c]))
  );

  return messageToReturn;
};
