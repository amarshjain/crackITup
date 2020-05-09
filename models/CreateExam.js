const mongoose = require("mongoose")

const CreateSchema = new mongoose.Schema({
    field: {
        type: String,
        required: true
    },

    dateOfConduct: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    mmarks: {
        type: Number,
        required: true
    },
    optChosen: {
        type: [String]
    },
    
    ques: [
        {
            isSubjective: {
                type: Boolean,
                default: false
            },
            que: {
                type: String,
                required: true
            },
            opts: {
                type: [String]
            },
            ans: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }
    ]

});

module.exports = CreateExam = mongoose.model('create_exam', CreateSchema);