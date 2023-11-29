import express from "express";
import jsonRouter from "./Routes/jsonRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";  

dotenv.config();
export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  res.sendFile(path.join(__dirname, "View", "index.html"));
});
