import db from "../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);

    const response = await db.user.create({
      data: {
        fullname,
        email,
        password,
      },
    });

    res
      .status(200)
      .json({ message: "User successfully signed up", signupSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", signupSuccess: false });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).send("User not Found");
    }
    // const passwordvalid = await bcrypt.compare(password, user.password);
    if (user.password !== password) {
      res.status(400).send("Password is Incorrect");
    }
    const token = jwt.sign(
      user.email,
      `${process.env.JWT_SECRET},{expiresIn:"1h"}`
    );
    res.cookie("token", "Bearer " + token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ message: "Sign in successful", signinSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signin failed", signinSuccess: false });
  }
};
