import db from "../db/db.js";
import cloudinaryupload from "../utils/cloudinary.service.js";

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

export const addnewbook = async (req, res) => {
  const { title, description, rentalprice, sellingprice, authorAuthorid } =
    req.body;
  console.log(req.file);
  const bookURL = await cloudinaryupload(req);

  try {
    await db.book.create({
      data: {
        title,
        description,
        bookURL,
        sellingprice: parseFloat(sellingprice),
        rentalprice: parseFloat(rentalprice),
        authorAuthorid: parseFloat(authorAuthorid),
      },
    });
    res.status(200).send("Book is created");
  } catch (error) {
    res.status(500).send(`Error in Creating book ${error}`);
  }
};
