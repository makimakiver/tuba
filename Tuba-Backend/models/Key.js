const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
    userId: {
        type: String,
        default: "",
        require: true,
    },
    key_code: {
        type: Array,
        default: [],
    },  
    second: {
        type: Array,
        default: [],
    }, 
    human: {
        type: Boolean,
        default: true,
    }

 },

 {timestamps: true }

);

module.exports = mongoose.model("Key", KeySchema);