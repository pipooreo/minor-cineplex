import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/auth.mjs";
import moviesRouter from "./routers/movies.mjs";
import cinemasRouter from "./routers/cinemas.mjs";
import cityRouter from "./routers/city.mjs";
import commentRouter from "./routers/comments.mjs";
import searchBarRouter from "./routers/searchBar.mjs";
import daysRouter from "./routers/days.mjs";
import bookedRouter from "./routers/booking.mjs";
import couponsRouter from "./routers/coupon.mjs";
import { v2 as cloudinary } from "cloudinary";
import paymentRouter from "./routers/payment.mjs";

import ticketRouter from "./routers/ticket.mjs";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/movies", moviesRouter);
app.use("/cinemas", cinemasRouter);
app.use("/comments", commentRouter);
app.use("/city", cityRouter);
app.use("/search", searchBarRouter);
app.use("/days", daysRouter);
app.use("/booking", bookedRouter);
app.use("/ticket", ticketRouter);
app.use("/payment", paymentRouter);
app.use("/coupons", couponsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
