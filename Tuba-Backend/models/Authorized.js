const mongoose = require("mongoose");

const AuthorizedSchema = new mongoose.Schema({
    users: {
        type: Array,
        default: [],
        require: true,
    },
    AIId: {
        type: String,
        default: "",
        require: true,
    },

 },

 {timestamps: true }

);

module.exports = mongoose.model("Authorized", AuthorizedSchema);