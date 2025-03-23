import express from "express";
import { addQuestion, deleteQuestion, getQuestions, updateQuestion } from "../controller/questionController.js";
import { upload } from "../middleware/multer.js";
const questionRoutes = express.Router()

questionRoutes.get('/',getQuestions)
questionRoutes.post('/',upload.fields([{ name: "image", maxCount: 1 }]),addQuestion)
questionRoutes.put('/:id',upload.fields([{ name: "image", maxCount: 1 }]),updateQuestion)
questionRoutes.delete('/:id',deleteQuestion)
export default questionRoutes