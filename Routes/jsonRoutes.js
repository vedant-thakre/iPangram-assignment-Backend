import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../Controllers/jsonController.js";

const router = express.Router();

router.get("/all", getAllData);
router.post("/new", createData);

router.route("/:id")
.get(getDataById)
.put(updateData).
delete(deleteData);

export default router;
