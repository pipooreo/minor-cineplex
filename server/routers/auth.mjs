import { Router } from "express";
import bcrypt from "bcrypt";
import connectionPool from "../utils/db.mjs";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  };
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

export default authRouter;
