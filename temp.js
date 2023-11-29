import express from "express";
import colors from "colors";
import fs from "fs/promises";

const app = express();
const PORT = 3000;
const JSON_FILE_PATH = "./db.json";

// Middleware to parse JSON data
app.use(express.json());

// Read the JSON file
const readJsonFile = async () => {
  try {
    const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`.red.bold);
    return [];
  }
};

// Write data to the JSON file
const writeJsonFile = async (data) => {
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing to JSON file: ${error.message}`.red.bold);
  }
};

app.get("/api/data", async (req, res) => {
  const jsonData = await readJsonFile();
  res.json(jsonData);
});

app.post("/api/data", async (req, res) => {
  const newItem = req.body;
  const jsonData = await readJsonFile();
  jsonData.push(newItem);
  await writeJsonFile(jsonData);
  res.json(newItem);
});

app.put("/api/data/:id", async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  let jsonData = await readJsonFile();

  // Find the index of the item with the given id
  const index = jsonData.findIndex((item) => item.id === parseInt(id));

  if (index !== -1) {
    // Update the item
    jsonData[index] = { ...jsonData[index], ...updatedItem };
    await writeJsonFile(jsonData);
    res.json(jsonData[index]);
  } else {
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
});

app.delete("/api/data/:id", async (req, res) => {
  const { id } = req.params;
  let jsonData = await readJsonFile();

  // Filter out the item with the given id
  jsonData = jsonData.filter((item) => item.id !== parseInt(id));

  await writeJsonFile(jsonData);
  res.json({ message: `Item with id ${id} deleted` });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.yellow.bold);
});
