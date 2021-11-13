const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Intent = require("../models/Intent");

// @route GET api/intents
router.get("/", verifyToken, async (req, res) => {
    try {
        const intents = await Intent.find();
        res.json({ success: true, intents });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route POST api/intents
router.post("/", verifyToken, async (req, res) => {
    const { name, tag, patterns, response } = req.body;

    if (!name || !tag)
        return res
            .status(400)
            .json({ success: false, message: "name and tag is required" });

    try {
        const newIntent = new Intent({
            name,
            tag,
            patterns,
            response,
        });
        await newIntent.save();
        res.json({
            success: true,
            message: "New intent successfully saved",
            intent: newIntent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route PUT api/intent/:id
router.put("/:id", verifyToken, async (req, res) => {
    const { name, tag, patterns, response } = req.body;

    if (!name || !tag)
        return res
            .status(400)
            .json({ success: false, message: "name and tag is required" });

    try {
        let updatedIntent = {
            name,
            tag,
            patterns,
            response,
        };

        const intentUpdateCondition = { _id: req.params.id };

        updatedIntent = await Intent.findOneAndUpdate(
            intentUpdateCondition,
            updatedIntent,
            { new: true }
        );

        // Error handling
        if (!updatedIntent)
            return res.status(401).json({
                success: false,
                message: "Intent not found or an error occurred",
            });

        res.json({
            success: true,
            message: "Intent was successfully updated",
            intent: updatedIntent,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route DELETE api/intent/:id
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const intentDeleteCondition = { _id: req.params.id };
        const deletedIntent = await Intent.findOneAndDelete(
            intentDeleteCondition
        );

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
