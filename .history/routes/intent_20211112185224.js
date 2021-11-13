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
        res.json({ success: true, message: "New intent successfully saved", intent: newIntent });
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
    const { title, description, url, status } = req.body;

    // Simple validation
    if (!title)
        return res
            .status(400)
            .json({ success: false, message: "Title is required" });

    try {
        let updatedPost = {
            title,
            description: description || "",
            url: (url.startsWith("https://") ? url : `https://${url}`) || "",
            status: status || "TO LEARN",
        };

        const postUpdateCondition = { _id: req.params.id, user: req.userId };

        updatedPost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatedPost,
            { new: true }
        );

        // User not authorised to update post or post not found
        if (!updatedPost)
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({
            success: true,
            message: "Excellent progress!",
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId };
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        // User not authorised or post not found
        if (!deletedPost)
            return res.status(401).json({
                success: false,
                message: "Post not found or user not authorised",
            });

        res.json({ success: true, post: deletedPost });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

module.exports = router;
