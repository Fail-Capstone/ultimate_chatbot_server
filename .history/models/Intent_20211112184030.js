const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IntentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    patterns: {
        type: [String],
    },
    response: {
        type: [String],
    },
});

module.exports = mongoose.model("intents", IntentSchema);
