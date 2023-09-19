const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamname: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        unique: true,
    },
    Desc: {
        type: String,
        max: 100,
        default:"",
    },
    ProfilePicture: {
        type: String,
        default: "",
    },
    followers: {
        type: Array,
        default: [],
    },
    // AdminUser: {
    //     type: Array,
    //     default: [],
    // },
    tags: {
        type: Array,
        default: [],
    },
    IsPrivate: {
        type: Boolean,
        default: false,
    },


 },

 {timestamps: true }

);

module.exports = mongoose.model("Team", TeamSchema);