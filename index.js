import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./router/userRoutes.js";
import cors from "cors"
import questionRoutes from "./router/questionRoutes.js";
import studyRoutes from "./router/studyRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/user", userRoutes);
app.use('/question', questionRoutes)
app.use("/study", studyRoutes)

app.get('/', (req,res)=>{
    res.send('Hello World')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
