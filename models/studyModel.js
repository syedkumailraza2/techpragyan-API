import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);

export default StudyMaterial; 
