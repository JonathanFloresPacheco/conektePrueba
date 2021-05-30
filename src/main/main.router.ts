import { Router } from "express";
import { sendRouter  } from "../send/send.router";

export const mainRouter = Router();
mainRouter
.use("/send", sendRouter)
;
