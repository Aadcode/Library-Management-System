import express from "express";
import dotenv from "dotenv";
import userroutes from "./routes/user.routes.js";
import authorroutes from "./routes/author.route.js";
import bookroutes from "./routes/book.route.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/user", userroutes);
app.use("/author", authorroutes);
app.use("/books", bookroutes);


app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT} `);
});
