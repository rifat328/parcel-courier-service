import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./DATABASE/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import parcelRouter from "./routes/parcel.routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/parcels", parcelRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Parcel Currier Service");
});

//error handling middleware
app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running on port  : http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
