import express from "express";
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controller/questionController.js";
import { upload } from "../middleware/multer.js";
const questionRoutes = express.Router()

questionRoutes.get('/',getQuestions)
questionRoutes.post('/',addQuestion)
questionRoutes.put('/:id',updateQuestion)
questionRoutes.delete('/:id',deleteQuestion)
export default questionRoutes