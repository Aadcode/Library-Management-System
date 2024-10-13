import express from "express";
import {
  addnewbook,
  bookdetail,
  getBooks,
} from "../controllers/book.controller.js";
import { upload } from "../middlewares/file.middleware.js";

const router = express.Router();
router.get("/:bookid", bookdetail);
router.get("/", getBooks);
router.post("/addbook", upload.single("bookFile"), addnewbook);

export default router;
