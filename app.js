import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./DATABASE/mongodb.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to the Parcel Currier Service");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port  : http://localhost:${PORT}`);
  await connectToDatabase();
});

export default app;
