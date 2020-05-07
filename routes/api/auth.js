const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// GET api/auth
// Check user Token
// Public route
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Post api/auth
// Authenticate User and get token
// Public route

router.post('/', [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').exists()
] ,
async (req, res) => {
    const errors = validationResult(req);
    if(!errors .isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials, Try again...' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials, Try again...' }] });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 36000},
        (err, token) => {
            if(err) throw err;
            res.json({token})
        }
        );


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})

module.exports = router;