import bcrypt from "bcrypt";
import connectionPool from "../utils/db.mjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";
import cloudinaryUpload from "../utils/upload.mjs";
// import multer from "multer";

export async function register(req, res) {
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
}

export async function login(req, res) {
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
    return res.status(404).json({ message: "Password not valid" });
  }
  let token;
  if (!req.body.remember) {
    token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
  } else {
    token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.SECRET_KEY
    );
  }

  return res.status(200).json({ message: "Login successfully", token });
}

export async function requestPassword(req, res) {
  // console.log(req.body.email);
  try {
    let user = await connectionPool.query(
      `select * from users where email = $1`,
      [req.body.email]
    );
    // console.log(user.rows[0]);
    if (!user.rows[0]) {
      return res.status(404).json({ message: "Email is invalid" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    let otpExpire = new Date();
    otpExpire.setMinutes(otpExpire.getMinutes() + 15);
    // const otpExpireString = otpExpire.toLocaleString();

    let result = await connectionPool.query(
      `update users set otp = $1, otp_expire = $2 where email = $3`,
      [otp, otpExpire, req.body.email]
    );
    // console.log(result);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SERVICE_EMAIL,
        pass: process.env.SERVICE_PASSWORD,
      },
    });
    // console.log(process.env.SERVICE_EMAIL, process.env.SERVICE_PASSWORD);
    const mailOptions = {
      from: process.env.SERVICE_EMAIL,
      to: req.body.email,
      subject: "Password reset OTP",
      text: `Your OTP (It is expired after 15 min) : ${otp}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Could not sending OTP reset password" });
      } else {
        return res.status(200).json({
          data: "Your OTP send to the email",
        });
      }
    });
  } catch {
    return res.status(500).json({ message: "Could not connect to DB" });
  }
}

export async function resetPassword(req, res) {
  let { password, otp } = req.body;
  const updated_at = new Date();
  // console.log(password, otp);
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    const otpExpire = await connectionPool.query(
      `select * from users where otp = $1 and otp_expire > now()`,
      [otp]
    );
    if (!otpExpire.rows[0]) {
      return res.status(400).json({ message: " OTP is expired" });
    }
    let result = await connectionPool.query(
      `update users set password = $1, otp = null, otp_expire = null, updated_at = $2 where otp = $3`,
      [password, updated_at, otp]
    );
    // console.log(result);
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }
  return res.status(200).json({ message: "Password has reseted successfully" });
}

export async function updatePassword(req, res) {
  let { password, id } = req.body;
  const updated_at = new Date();
  // console.log(password, id);
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    let result = await connectionPool.query(
      `update users set password = $1, updated_at = $2 where id = $3`,
      [password, updated_at, id]
    );
    // console.log(result);
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }
  return res.status(200).json({ message: "Password has updated successfully" });
}

export async function updateProfile(req, res) {
  const user = req.body;
  // console.log(user);
  console.log(req.files);

  try {
    if (req.files.image) {
      // console.log(req.files.image);
      // const avatarUrl = await cloudinaryUpload(req.files);
      const avatarUrl = await cloudinaryUpload(
        req.files.image[0].buffer,
        req.files.image[0].originalname
      );
      user["image"] = avatarUrl.url;
      // console.log(user);
      const updated_at = new Date();
      await connectionPool.query(
        `update users set image = $1, name = $2, updated_at = $3 where email = $4`,
        [user.image, user.name, updated_at, user.email]
      );
    } else {
      // console.log(user);
      const updated_at = new Date();
      await connectionPool.query(
        `update users set name = $1, updated_at = $2 where email = $3`,
        [user.name, updated_at, user.email]
      );
    }
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }

  return res.status(200).json({ message: "Profile has updated successfully" });
}

export async function getUserById(req, res) {
  // const user = req.body;
  // console.log(user);
  // console.log(req.files.image);
  const userId = req.params.userId;
  try {
    let result = await connectionPool.query(
      `select * from users where id = $1`,
      [userId]
    );
    return res.status(200).json({ data: result.rows[0] });
  } catch {
    return res
      .status(500)
      .json({ message: "Server could not connect Database" });
  }
}
