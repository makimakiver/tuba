const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    otp: {
        type: String,

    },
    email: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
    },
    expiresAt: {
        type: Date,
    },
},
 {timestamps: true }

);

module.exports = mongoose.model("otp", otpSchema);