import express from "express";
import { upload } from "../middleware/multer.js";
import { 
    uploadStudyMaterial, 
    getAllStudyMaterials, 
    getStudyMaterialById, 
    updateStudyMaterial, 
    deleteStudyMaterial, 
    searchStudyMaterials 
} from "../controller/studyController.js";

const router = express.Router();

router.post('/upload', upload.single('file'), uploadStudyMaterial);
router.get('/all', getAllStudyMaterials);
router.get('/:id', getStudyMaterialById);
router.put('/:id', updateStudyMaterial);
router.delete('/:id', deleteStudyMaterial);
router.get('/search', searchStudyMaterials);

export default router;  
