import Question from "../models/questionModel.js";

const addQuestion = async (req, res) => {
    try {
        const { question, answer, options, image, subjectId } = req.body;

        // Validate required fields
        if (!question || !answer || !options || !subjectId) {
            return res.status(400).json({ message: "All fields except image are required" });
        }

        // Ensure options is an array
        if (!Array.isArray(options) || options.length < 2) {
            return res.status(400).json({ message: "Options must be an array with at least two values" });
        }

        // Create a new question
        const newQuestion = new Question({
            question,
            answer,
            options,
            image,
            subjectId
        });

        // Save to database
        await newQuestion.save();

        res.status(201).json({ message: "Question added successfully", question: newQuestion });

    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { addQuestion }