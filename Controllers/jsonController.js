import { readJsonFile, writeJsonFile } from "../Utils/helper.js";

export const getAllData = async (req, res) => {
  const jsonData = await readJsonFile();
  if (jsonData.length === 0) {
    return res.status(404).json({ message: "Data not found" });
  }
  res.json(jsonData);
};


export const getDataById = async (req, res) => {
  const { id } = req.params;
  const jsonData = await readJsonFile();

  const item = jsonData.find((item) => item.id === parseInt(id, 10));

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
};


export const createData = async (req, res) => {
  const newItem = req.body;
  const jsonData = await readJsonFile();
  jsonData.push(newItem);
  await writeJsonFile(jsonData);

  const itemIndex = jsonData.indexOf(newItem);

  if (itemIndex !== -1) {
    res.json({ message: "Data added successfully", data: newItem });
  } else {
    res.status(404).json({ message: "Failed to add the item" });
  }
};


export const updateData = async (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  let jsonData = await readJsonFile();

  const index = jsonData.findIndex((item) => item.id === parseInt(id, 10));

  if (index !== -1) {
    jsonData[index] = { ...jsonData[index], ...updatedItem };
    await writeJsonFile(jsonData);
    res.json({ message:`Data deleted with id ${id} successfully`, data: jsonData[index] });
  } else {
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;
  let jsonData = await readJsonFile();

  const index = jsonData.findIndex((item) => item.id === parseInt(id, 10));

  if (index !== -1) {
    const deletedItem = jsonData[index];

    jsonData.splice(index, 1);

    await writeJsonFile(jsonData);

    res.json({ message: `Data deleted with id ${id} successfully`, deleted: deletedItem });
  } else {
    res.status(404).json({ message: `Item with id ${id} not found` });
  }
};
