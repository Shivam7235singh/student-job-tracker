import dotenv from "dotenv"; 
import express from "express";
dotenv.config(); 
import {connectDatabase} from './config/db.js'
import path from "path";
import cors from "cors";

import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config()
const app = express()
app.use(express.json())

connectDatabase();

// CORS Configuration
const corsOptions = {
  origin: "https://student-job-tracker-navy.vercel.app/",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));




  
  app.use("/api/jobs", jobRoutes);
  app.use("/api/users", userRoutes);
  
const PORT = process.env.PORT || 5000


 app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  











