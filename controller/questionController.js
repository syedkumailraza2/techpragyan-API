import Question from "../models/questionModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addQuestion = async (req, res) => {
    try {
        const { question, answer, options, subjectId } = req.body;

        // Validate required fields
        if (!question || !answer || !options || !subjectId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure options is an array
        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "Options must be an array with at least two values" });
        }

        const imageBuff = req.files?.image?.[0]?.buffer;
        if (!imageBuff) {
            return res.status(400).json({ message: "image is required" });
        }

        const image = await uploadOnCloudinary(imageBuff)
        if (!image) {
            return res.status(400).json({ message: "Failed to upload image" });
        }

        // Create a new question
        const newQuestion = new Question({
            question,
            answer,
            options,
            subjectId,
            image:image.secure_url
        });

        // Save to database
        await newQuestion.save();

        res.status(201).json({ message: "Question added successfully", question: newQuestion });

    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateQuestion = async (req,res)=>{
    try {
        const questionId = req.params.id
        const questionExist = await Question.findById(questionId)

        if(!questionExist){
            res.status(404).json({message:"Question does'nt exist"})
        }

        if(req.files?.image?.[0]?.buffer) {
            const uploadedImage = await uploadOnCloudinary(req.files.image[0].buffer);
            if (uploadedImage) Question.image = uploadedImage.secure_image;
        }

        const updatedQ = await Question.findOneAndUpdate(
            { _id: questionId },
            { $set: req.body },
            { new: true } //return updated document
        )

        res.status(200).json({ message:"Question updated Successfully", question: updatedQ })
    } catch (error) {
        console.error("Error while updating questions: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }  
}

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // Fetch 10 random questions

        res.status(200).json({ message: "Questions fetched successfully", questions });
    } catch (error) {
        console.error("Error while fetching questions: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        // Find the question first
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question doesn't exist" });
        }

        // Delete the question
        await Question.deleteOne({ _id: questionId });

        // Send response once
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        console.error("Error while deleting question:", error);

        // Send error response
        if (!res.headersSent) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};


export { addQuestion, updateQuestion, getQuestions, deleteQuestion }