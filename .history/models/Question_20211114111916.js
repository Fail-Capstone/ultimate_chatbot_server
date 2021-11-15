const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        patterns: {
            type: [String],
        },
        response: {
            type: [String],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("intents", QuestionSchema);
