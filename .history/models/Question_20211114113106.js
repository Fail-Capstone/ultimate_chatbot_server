const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);
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
        prob: {
            type: Float
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("question", QuestionSchema);
