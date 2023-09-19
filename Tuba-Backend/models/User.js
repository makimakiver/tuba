const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        unique: true,
        match: /.+\@.+\..+/,
        // where did it come from? regular expression of the gmail address
    },
    password: {
        type: String,
        required: true,
        min: 7,
        max: 20,
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
    BelongTo: {
        type: Array,
        default: [],
    },
    IsPrivate: {
        type: Boolean,
        default: false,
    },
    IsPicturePrivate: {
        type: Boolean,
        default: false,
    },

 },

 {timestamps: true }

);

module.exports = mongoose.model("User", UserSchema);