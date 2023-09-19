const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
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
    username: {
        type: String,
        default: "",
        required: true,
    },
    tags: {
        type: Array,
        default: [],
    },  
    likes: {
        type: Array,
        default: [],
    },

    // comments: {
    //     type: Array,
    //     default: [],
    // }, 
    teamname: {
        type: Array,
        default: [],
        require: true,
    }

 },

 {timestamps: true }

);

module.exports = mongoose.model("Post", PostSchema);