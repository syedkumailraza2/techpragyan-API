import StudyMaterial from "../models/studyModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Upload Study Material
const uploadStudyMaterial = async (req, res) => {
    try {
        const { title, subject, year, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }

        // Upload file to Cloudinary
        const result = await uploadOnCloudinary(req.file.buffer);

        if (!result || !result.secure_url) {
            return res.status(500).json({ error: "Failed to upload file to Cloudinary" });
        }

        // Save file data in MongoDB
        const studyMaterial = await StudyMaterial.create({
            title,
            subject,
            year,
            description,
            fileUrl: result.secure_url
        });

        res.status(201).json({ message: "Study material uploaded successfully", studyMaterial });
    } catch (error) {
        console.error("Error in uploadStudyMaterial:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get All Study Materials
const getAllStudyMaterials = async (req, res) => {
    try {
        const studyMaterials = await StudyMaterial.find();
        res.status(200).json(studyMaterials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Study Material by ID
const getStudyMaterialById = async (req, res) => {
    try {
        const studyMaterial = await StudyMaterial.findById(req.params.id);
        if (!studyMaterial) {
            return res.status(404).json({ error: "Study material not found" });
        }
        res.status(200).json(studyMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Study Material
const updateStudyMaterial = async (req, res) => {
    try {
        const { title, subject, year, description } = req.body;
        const updatedMaterial = await StudyMaterial.findByIdAndUpdate(
            req.params.id, 
            { title, subject, year, description }, 
            { new: true }
        );

        if (!updatedMaterial) {
            return res.status(404).json({ error: "Study material not found" });
        }

        res.status(200).json({ message: "Study material updated successfully", updatedMaterial });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Study Material
const deleteStudyMaterial = async (req, res) => {
    try {
        const deletedMaterial = await StudyMaterial.findByIdAndDelete(req.params.id);
        if (!deletedMaterial) {
            return res.status(404).json({ error: "Study material not found" });
        }
        res.status(200).json({ message: "Study material deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search Study Materials by Title
const searchStudyMaterials = async (req, res) => {
    try {
        const { query } = req.query;
        const results = await StudyMaterial.find({ 
            title: { $regex: query, $options: 'i' } 
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Export all functions at the end
export {
    uploadStudyMaterial,
    getAllStudyMaterials,
    getStudyMaterialById,
    updateStudyMaterial,
    deleteStudyMaterial,
    searchStudyMaterials
};
