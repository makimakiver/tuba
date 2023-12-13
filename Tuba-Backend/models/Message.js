const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        default: "",
    },
    sender: {
        type: String,
        default: "",
    },
    AIID:{
        type: String,
        default: "",
    },
    messageId:{
        type: String,
        default: "",
    }
 },

 {timestamps: true }

);

module.exports = mongoose.model("Message", MessageSchema);