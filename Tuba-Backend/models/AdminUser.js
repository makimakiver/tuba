const mongoose = require("mongoose");

const AdminUserSchema = new mongoose.Schema({
    users: {
        type: Array,
        default: [],
        require: true,
    },
    teamId: {
        type: String,
        default: "",
        require: true,
    },

 },

 {timestamps: true }

);

module.exports = mongoose.model("AdminUser", AdminUserSchema);