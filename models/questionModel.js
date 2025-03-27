import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    id:{ type: Number, required: true },
    text: { type: String, required: true },
    options: [],
    correctAnswer: { type: String, required: true },
    points: { type: String },
});

const Question = mongoose.model('Question', questionSchema);
export default Question
