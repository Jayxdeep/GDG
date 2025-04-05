import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    studentId: String,
    subject: String,
    submittedFile: String,
    marks: Number,
    feedback: String,
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
