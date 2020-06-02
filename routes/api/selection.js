const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");

const Selections = require("../../models/Selections");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const CreateExam = require("../../models/CreateExam");


// POST api/selection
// Post selection list
// admin only
router.post('/:examId', [auth, [
    check('cutoff', 'Cutoff marks is required').not().isEmpty()
]], async (req, res) => {

    if(req.user.admin === false) {
        return res.status(401).json({ msg: "Not Authorized for this task"});
    }

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({ errors: errors.array()});
    }

    const {cutoff} = req.body;
    let exam = await CreateExam.findOne({_id: req.params.examId});

    const selectionInfo = {};
    selectionInfo.exam = exam;
    selectionInfo.cutoff = cutoff;
    selectionInfo.selectedUsers = [];

    const profiles = await Profile.find().populate('user', ['name', 'avatar', 'exams', 'email']);

    profiles.forEach((profile) => {
        const examIndex = profile.user.exams.map(exam => exam._id).indexOf(req.params.examId);
        if(examIndex > -1) {
            if(profile.user.exams[examIndex].marksobt >= cutoff) {
                const info = {}
                info.profile = profile
                info.email = profile.user.email
                info.name = profile.user.name
                info.avatar = profile.user.avatar
                selectionInfo.selectedUsers.push(info);
            }
        }

    });

    let selection = new Selections(selectionInfo);
    await selection.save();
    res.json(selection);



});

// GET api/selection
// Get all selection lists
// Private
router.get('/', auth, async (req, res) => {
    try {
        const selections = await Selections.find();
        res.json(selections);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// GET /api/selection/:sel_id
// get list by ID
// Private
router.get('/:sel_id', auth, async (req, res) => {
    try {
        
        const selection = await Selections.findOne({_id: req.params.sel_id});

        if(!selection) return res.status(404).json({msg: "Selecion List not found"})

        res.json(selection);

    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
})

// DELETE /api/selection/:sel_id
// Delete a selection list
// Admin only
router.delete('/:sel_id', auth, async (req, res) => {
    try {
        if(req.user.admin === false) {
            return res.status(401).json({ msg: "Not Authorized for this task"});
        }

        await Selections.findByIdAndRemove({_id: req.params.sel_id});
        res.json({msg: 'List deleted'});
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
})



module.exports = router;