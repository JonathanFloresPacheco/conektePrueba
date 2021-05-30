import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import jwt from "express-jwt";
import { METHODS } from "http";
import morgan from "morgan";
import { envelope } from "./helpers/envelope";
import { Handlers } from "./helpers/handlers";
import { mainRouter } from "./main/main.router";
export const app: Application = express();
import { JWT_SECRET } from "./config/env";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.use(cors());
app.options("http://localhost:4200", cors());

app.use("/", jwt({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
}),
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      const resError = Handlers.errorHandler({ error: "Unauthorized." }, "UNAUTHORIZED");
      res.status(resError.code).json(envelope(resError.data));
      return err;
    }
    next();
  },
);
app.use("/", mainRouter);
