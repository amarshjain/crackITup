const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const {check, validationResult} = require("express-validator");

// GET api/profile/me
// Get current users profile
// Private route
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({msg: "There is no profile for the user"});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET api/profile
// Get all profiles
// Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar', 'exams']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        req.status(500).send('Server Error');
    }
});

// POST api/profile
// Create users profile
// Private route
router.post('/', [auth, [
    check('field', 'Field is required').not().isEmpty(),
    check('admno', 'Admission Number is required').not().isEmpty(),
    check('branch', 'Branch is required').not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { field, branch, admno, phno } = req.body;

    //Build profile object
    const profileFields = {}
    profileFields.user = req.user.id;
    profileFields.admno = admno;
    profileFields.field = field;
    profileFields.branch = branch;
    if (phno) profileFields.phno = phno;

    try {
        let profile = await Profile.findOne({user: req.user.id});

        //Update
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true});
            return res.json(profile);
        }

        //Create
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

module.exports = router;