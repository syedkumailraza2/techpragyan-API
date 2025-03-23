import Subject from "../models/subjectModel.js"

const addSubject = async (req, res) => {
    try {
        const { name } = req.body;

        // ✅ Return response to stop execution if name is missing
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const newSubject = new Subject({ name });
        await newSubject.save();

        return res.status(201).json({ message: "Subject added successfully", subject: newSubject });
    } catch (error) {
        console.error("Error adding subject:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const deleteSubject = async (req,res)=>{
    try {
        const subjectId = req.params.id
        const subjectExist = await Subject.findById(subjectId)
        if (!subjectExist) {
            return res.status(404).json({ message: "Subject doesn't exist" });
        }
    
        await Subject.deleteOne({ _id: subjectId });
    
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { addSubject, deleteSubject }