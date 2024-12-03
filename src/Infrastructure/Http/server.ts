import "reflect-metadata";
import express from "express";
import cors from "cors";
import errorHandler from "../Middlewares/errorHandler";
import router from "../Http/Routes/index";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use("/", router);

export { app };
