const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Question = require("../models/Question");

// @route GET api/questions
router.get("/", verifyToken, async (req, res) => {
    try {
        const questions = await Question.find();
        res.json({ success: true, questions });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route POST api/questions
router.post("/", verifyToken, async (req, res) => {
    const { question, tag,prob } = req.body;

    if (!question)
        return res
            .status(400)
            .json({ success: false, message: "question is required" });

    try {
        const newQuestion = new Question({
            question, tag,prob
        });
        await newQuestion.save();
        res.json({
            success: true,
            message: "New question successfully saved",
            question: newQuestion,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route DELETE api/intents
router.delete("/", verifyToken, async (req, res) => {
    try {
        const intentDeleteCondition = { _id: req.params.id };
        const deletedIntent = await Intent.findOneAndDelete(
            intentDeleteCondition
        );
        Site.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})
        // Error handling
        if (!deletedIntent)
            return res.status(401).json({
                success: false,
                message: "Intent not found or an error occurred",
            });

        res.json({ success: true, intent: deletedIntent });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
