import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
import newsRoutes from "./router/newsRoutes.js"
import cors from "cors"

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/user", userRoutes);
app.use("/news", newsRoutes);

app.get('/', (req,res)=>{
    res.send('Hello World')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
