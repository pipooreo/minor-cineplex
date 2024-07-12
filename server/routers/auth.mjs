import { Router } from "express";
import bcrypt from "bcrypt";
import connectionPool from "../utils/db.mjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
  let getEmailUsed = await connectionPool.query(
    `select * from users where email = $1`,
    [user.email]
  );
  getEmailUsed = getEmailUsed.rows[0];

  if (getEmailUsed) {
    return res
      .status(400)
      .json({ message: "Email is already taken, Please try another email" });
  }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  try {
    await connectionPool.query(
      `insert into users (name, password, email)
            values ($1, $2, $3)`,
      [user.name, user.password, user.email]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }
  return res.status(201).json({ message: "User created successfully" });
});

authRouter.post("/login", async (req, res) => {
  let user = await connectionPool.query(
    `select * from users where email = $1`,
    [req.body.email]
  );
  user = user.rows[0];
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(404).json({ message: "PAssword not valid" });
  }
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  return res.status(200).json({ message: "Login successfully", token });
});

export default authRouter;
