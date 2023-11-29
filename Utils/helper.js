import fs from "fs/promises";

const JSON_FILE_PATH = "./Data/db.json";

// Read the JSON file
export const readJsonFile = async () => {
  try {
    const data = await fs.readFile(JSON_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`.red.bold);
    return [];
  }
};

// Write data to the JSON file
export const writeJsonFile = async (data) => {
  try {
    await fs.writeFile(JSON_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing to JSON file: ${error.message}`.red.bold);
  }
};
