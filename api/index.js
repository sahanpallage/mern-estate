import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB!");
  });

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//!Middleware for handling errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
