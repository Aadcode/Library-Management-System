import express from "express";
import {
  addnewbook,
  bookdetail,
  getBooks,
} from "../controllers/book.controller.js";

const router = express.Router();
router.get("/:bookid", bookdetail);
router.get("/", getBooks);
router.post("/addbook", addnewbook);

export default router;
