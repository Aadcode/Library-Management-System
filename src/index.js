import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import userroutes from "./routes/user.routes.js";
app.use(express.json());

app.use("/user", userroutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT} `);
});
