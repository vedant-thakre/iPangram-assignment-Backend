import express from "express";
import jsonRouter from './Routes/jsonRoutes.js'

import dotenv from 'dotenv';

export const app = express();
dotenv.config();

// Middleware to parse JSON data
app.use(express.json());
app.use("/api/json", jsonRouter);

app.get("/", (req, res) =>{
    res.send("Server is Live");
});

