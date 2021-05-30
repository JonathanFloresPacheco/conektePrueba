import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { mainRouter } from "./main/main.router";
export const app: Application = express();
require('./config/db');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.use(cors());
app.options("http://localhost:4200", cors());

app.use("/", mainRouter);
