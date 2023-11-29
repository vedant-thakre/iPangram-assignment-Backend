import express from "express";
import jsonRouter from "./Routes/jsonRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
export const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);



// Route setup
app.use("/api/json", jsonRouter);

app.get("/", (req, res) => {
  res.send("Server is Live");
});
