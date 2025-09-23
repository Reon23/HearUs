import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import errorHandling from "./middleware/errorHandler.js";

import {
    createExamTable,
    createInstructorTable,
    createQuestionBankTable,
    createQuestionTable,
    createResultTable,
    createStudentTable,
} from "./data/createTables.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", questionRoutes);
app.use("/api", examRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandling);

//Create table before server runs (if they do not exist)
createInstructorTable();
createStudentTable();
createQuestionBankTable();
createQuestionTable();
createExamTable();
createResultTable();

// Test
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

// Server running
app.listen(port, () =>
    console.log(`Server started on : http://localhost:${port}`),
);
