import { Response, Request, Body } from "https://deno.land/x/oak/mod.ts";
import { transpoleMatrixIntoString } from "../utils/operations.ts";

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
  const codedMessage = transpoleMatrixIntoString(mensaje, vueltas, height);
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
  const decodedMessage = transpoleMatrixIntoString(mensaje, height, vueltas);

  response.body = {
    mensaje: decodedMessage,
  };
  response.status = 200;
};
