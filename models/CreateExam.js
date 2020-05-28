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

    from: {
        type: String,
        required: true
    },

    to: {
        type: String,
        required: true
    },

    mmarks: {
        type: Number,
        required: true
    },
    marksobt: {
        type: Number,
        default: 0
    },

    isSubmitted: {
        type: Boolean,
        default: false,
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
            marks: {
                type: Number,
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