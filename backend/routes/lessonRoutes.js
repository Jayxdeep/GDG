import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Lessons route is working!");
});

export default router; // ✅ default export
