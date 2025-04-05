import axios from "axios";
import dotenv from "dotenv";
import Assignment from "../models/Assignment.js";
dotenv.config();

export const gradeAssignment = async (req, res) => {
  const { studentId, subject, submittedFile } = req.body;

  const prompt = `
You are an experienced teacher grading assignments.
Review the following student submission and give:
- A score out of 100
- 1-2 sentence feedback
Focus on structure, grammar, clarity, completeness, and accuracy.

Student Submission:
"""${submittedFile}"""

Respond in JSON:
{
  "marks": number between 0 and 100,
  "feedback": string
}
`;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "meta-llama/Llama-3-70b-chat-hf",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resultText = response.data.choices[0].message.content.trim();
    console.log("Raw Together.ai Response:", resultText);

    // ✅ Extract only the JSON part using regex
    const jsonMatch = resultText.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from Together.ai response.");
    }

    const { marks, feedback } = JSON.parse(jsonMatch[0]);

    const newAssignment = new Assignment({
      studentId,
      subject,
      submittedFile,
      marks,
      feedback,
    });

    await newAssignment.save();

    res.json({
      message: "Assignment graded successfully!",
      assignment: newAssignment,
    });
  } catch (error) {
    console.error("Grading Error:", error);
    res.status(500).json({
      error: "Failed to grade assignment.",
      details: error.message,
    });
  }
};
