import express from 'express'
import {gradeAssignment} from '../controllers/assignmentCont.js'
const router=express.Router()
router.post("/grade",gradeAssignment)
export default router;

