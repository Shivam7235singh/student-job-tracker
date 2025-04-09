import dotenv from "dotenv"; 
import express from "express";
dotenv.config(); 
import {connectDatabase} from './config/db.js'
import path from "path";
import cors from "cors";



dotenv.config()
const app = express()
app.use(express.json())

connectDatabase();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
  };
  app.use(cors(corsOptions));

app.get('/', (req, res) =>{
    res.send("API is running...")
})

const PORT = process.env.PORT || 5000


 app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  











