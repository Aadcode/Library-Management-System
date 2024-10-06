import express from "express";
import { bookdetail, getBooks } from "../controllers/book.controller.js";

const router = express.Router();
router.get("/:bookid", bookdetail);
router.get("/", getBooks);


export default router;
