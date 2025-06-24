import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import createTableUser from "../db/createTableUser.js";
import userRoute from "../routes/userRoute.js";
import errorHandling from "../middleware/error.handle.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2004;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/user", userRoute);

// Error handling middleware
app.use(errorHandling);

// Create table before starting server
createTableUser();

app.listen(PORT, () => {
  console.log(`Sever is running http://localhost:${PORT}`);
});
