import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";

const transpoleMatrix = (
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

export const encode = async ({
  response,
  request,
}: {
  response: Response;
  request: Request;
}) => {
  const body = request.body({ type: "json" });
  const { vueltas, mensaje } = await body.value;
  const height = Math.ceil(mensaje.length / vueltas);
  const codedMessage = transpoleMatrix(mensaje, vueltas, height);
  response.body = {
    mensaje: codedMessage,
  };
  response.status = 200;
};

export const decode = async ({
  response,
  request,
}: {
  response: Response;
  request: Request;
}) => {
  const body = request.body({ type: "json" });
  const { vueltas, mensaje } = await body.value;
  const height = Math.ceil(mensaje.length / vueltas);
  const decodedMessage = transpoleMatrix(mensaje, height, vueltas);

  response.body = {
    mensaje: decodedMessage,
  };
  response.status = 200;
};
