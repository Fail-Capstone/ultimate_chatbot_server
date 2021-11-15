const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        Prob: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("question", QuestionSchema);
