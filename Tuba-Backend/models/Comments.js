const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        default:"",
        max: 1000,
    },
    img: {
        type: String,
        default:"",
    },
    tags: {
        type: Array,
        default: [],
    },  
    likes: {
        type: Array,
        default: [],
    },

 },

 {timestamps: true }

);

module.exports = mongoose.model("Comments", CommentsSchema);