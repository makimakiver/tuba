const mongoose = require("mongoose");
const AIaccountSchema = new mongoose.Schema({
    AIname: {
        type: String,
        required: true,
        min: 1,
        max: 20,
        unique: true,
    },
    systemPrompt: {
        type: String,
        default: "",       
    },
    Desc: {
        type: String,
        max: 100,
        default:"",
    },
    TeamBased: {
        type: Boolean,
        default: true,
    },
    BelongTo: {
        type: Array,
        default: [],
    },
    ProfilePicture: {
        type: String,
        default: "",
    },
    IsPrivate: {
        type: Boolean,
        default: false,
    },
    prevCount:{
        type: Number,
        default: 0,       
    },
    count:{
        type: Number,
        default: 0,
    }   
 },
 {timestamps: true }
);
module.exports = mongoose.model("AIaccount", AIaccountSchema);