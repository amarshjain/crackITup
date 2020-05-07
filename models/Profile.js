const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    field: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    admno: {
        type: String,
        required: true
    },
    phno: {
        type: String
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);