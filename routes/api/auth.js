const express = require("express");
const router = express.Router();

// GET api/auth
// 
// Public route
router.get('/', (req, res) => res.send('auth route'))

module.exports = router;