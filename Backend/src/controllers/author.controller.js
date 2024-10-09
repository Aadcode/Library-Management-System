import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  const { authorname, authoremail, authorpassword } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);

    const author = await db.author.create({
      data: {
        authorname,
        authoremail,
        authorpassword,
      },
    });

    res
      .status(200)
      .json({ message: "Author successfully signed up", signupSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", signupSuccess: false });
  }
};

export const signin = async (req, res) => {
  const { authoremail, authorpassword } = req.body;
  try {
    const author = await db.author.findUnique({
      where: {
        authoremail,
      },
    });

    if (!author) {
      res.status(404).send("author not Found");
    }
    // const passwordvalid = await bcrypt.compare(password, author.password);
    if (author.authorpassword !== authorpassword) {
      res.status(400).send("Password is Incorrect");
    }
    req.session.isLoggedIn = true;
    req.session.authorid = author.authorid;

    res
      .status(200)
      .json({ message: "Author Signin successful", signinSuccess: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Author Signin failed", signinSuccess: false });
  }
};
