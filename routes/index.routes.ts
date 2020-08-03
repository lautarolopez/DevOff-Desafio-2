import { Router } from "https://deno.land/x/oak/mod.ts";
import * as indexController from "../controllers/index.controllers.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "DevOFF 2nd challenge";
});

router.post("/encode", indexController.encode);
router.post("/decode", indexController.decode);

export default router;
