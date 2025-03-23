import express from "express";
import { addSubject, deleteSubject } from "../controller/subjectController.js";
const subjectRoutes = express.Router()

subjectRoutes.post('/',addSubject)
subjectRoutes.delete('/:id',deleteSubject)
export default subjectRoutes