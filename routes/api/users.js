const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");

const User = require("../../models/User");

// POST api/users
// Register User
// Public route
router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail,
    check('password', 'Please Enter a password with 6 or more characters').isLength({min: 6})
] ,
async (req, res) => {
    const errors = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    

    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({ errors: [{ msg: 'User Already Exists' }] });
        }

        //Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name, email, avatar, password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.send("User Created");


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})

module.exports = router;