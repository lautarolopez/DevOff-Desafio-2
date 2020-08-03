import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";

export const encode = async ({
  response,
  request,
}: {
  response: Response;
  request: Request;
}) => {
  const body = await request.body({ type: "json" });
  const { vueltas, mensaje } = await body.value;
  const height = Math.ceil(mensaje.length / vueltas);
  let matrix: string[][] = [];
  let stringCount = 0;
  for (let i = 0; i < height; i++) {
    matrix[i] = [];
    for (let x = 0; x < vueltas; x++) {
      if (stringCount < mensaje.length) {
        matrix[i][x] = mensaje[stringCount];
        stringCount++;
      } else {
        matrix[i][x] = " ";
      }
    }
  }

  let messageToReturn = "";

  for (let x = 0; x < vueltas; x++) {
    for (let i = 0; i < height; i++) {
      if (matrix[i][x]) {
        messageToReturn += matrix[i][x];
      }
    }
  }

  response.body = {
    mensaje: messageToReturn,
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
  const body = await request.body({ type: "json" });
  const { vueltas, mensaje } = await body.value;
  const height = Math.ceil(mensaje.length / vueltas);
  let matrix: string[][] = [];
  let stringCount = 0;
  for (let x = 0; x < vueltas; x++) {
    matrix[x] = [];
    for (let i = 0; i < height; i++) {
      if (stringCount < mensaje.length) {
        matrix[x][i] = mensaje[stringCount];
        stringCount++;
      } else {
        matrix[x][i] = "";
      }
    }
  }

  let messageToReturn = "";

  for (let i = 0; i < height; i++) {
    for (let x = 0; x < vueltas; x++) {
      if (matrix[x][i]) {
        messageToReturn += matrix[x][i];
      }
    }
  }

  response.body = {
    mensaje: messageToReturn,
  };
  response.status = 200;
};
