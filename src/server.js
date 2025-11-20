// ! Packages
import express from "express";
import dotenv from "dotenv";

import rateLimiter from "./middleware/rateLimitMiddleware.js";

// ! Utils
import connectDB from "./config/dbConnection.js";

// ! Routers
import noteRouter from "./routes/noteRouter.js";

// ! Middleware
import errMiddleware from "./middleware/errMiddleware.js";

// ! App
const app = express();
dotenv.config({ path: "./src/config/.env" });

// ! Middleware
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRouter);
app.use(errMiddleware);

// ! DataBase Connection
connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
  console.log("Connection to Database is Successfull!");
});
