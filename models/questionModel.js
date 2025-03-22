import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: [String], required: true }, // Fixed array of strings
    image: { type: String }, // Optional field
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true } // Fixed reference
});

const Question = mongoose.model('Question', questionSchema);
export default Question
