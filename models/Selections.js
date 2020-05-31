const mongoose = require("mongoose");

const SelectionSchema = new mongoose.Schema({
    exam: {
        type: Object,
        ref: 'create-exam'
    },
    cutoff: {
        type: Number,
        required: true
    },
    selectedUsers: {
        type: [Object]
    }
});

module.exports = Selections = mongoose.model("selections", SelectionSchema);