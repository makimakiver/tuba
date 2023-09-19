const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        type: Text,
        required: true,
    },
    users: {
        type: Array,
        default: [],
    },
    sender: {
        type: Object,
    }

 },

 {timestamps: true }

);

module.exports = mongoose.model("Message", MessageSchema);