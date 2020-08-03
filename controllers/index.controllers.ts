import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";

const transpileMatrix = (
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
      if (stringCount < message.length) {
        matrix[i][x] = message[stringCount];
        stringCount++;
      } else {
        matrix[i][x] = " ";
      }
    }
  }

  let messageToReturn = "";

  // Reading the message from the matrix in oppossite order
  for (let x = 0; x < width; x++) {
    for (let i = 0; i < height; i++) {
      if (matrix[i][x]) {
        messageToReturn += matrix[i][x];
      }
    }
  }

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
  const codedMessage = transpileMatrix(mensaje, vueltas, height);
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
  const decodedMessage = transpileMatrix(mensaje, height, vueltas);

  response.body = {
    mensaje: decodedMessage,
  };
  response.status = 200;
};
