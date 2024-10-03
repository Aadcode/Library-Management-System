import db from "../db/db.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await db.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
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
  const response = await db.user.findfirst({});
};
