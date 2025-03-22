import express from "express";
import { addQuestion } from "../controller/questionController.js";
const questionRoutes = express.Router()

questionRoutes.post('/',addQuestion)

export default questionRoutes