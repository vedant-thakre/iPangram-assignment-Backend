import express from "express";
import jsonRouter from "./Routes/jsonRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

export const app = express();
dotenv.config();

// Middleware to enable CORS
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON data
app.use(express.json());

// Route setup
app.use("/api/json", jsonRouter);

app.get("/", (req, res) => {
  res.send("Server is Live");
});
