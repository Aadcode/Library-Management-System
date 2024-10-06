import db from "../db/db.js";

export const getBooks = async (req, res) => {
  try {
    const books = await db.book.findMany();
    res.status(200).json({
      books: books,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const bookdetail = async (req, res) => {
  const bookid = req.params.bookid;
  try {
    const book = await db.book.findFirst({
      where: {
        bookid: parseInt(bookid),
      },
    });
    res.status(200).json({ book });
  } catch {
    res.status(500).send("Book details are Not available");
  }
};
