// imports
import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

// rutas
import apiRouter from "./routes/api.router";

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));

// routes
app.use("/api", apiRouter);

export default app;
