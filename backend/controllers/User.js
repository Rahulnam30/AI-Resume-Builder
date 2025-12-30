const express = require('express');
const router = express.Router();
const User = require('./../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
app.use('/api', router);
// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password} = req.body;
        const useremail = await User.findOne({ email });
        if(password.length < 6){
            return  res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (useremail) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPass });
        await newUser.save();
        res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: `something went wrong: ${error.message}` });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPassmatch = await bcrypt.compare(password, user.password);
        if (!isPassmatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Happy Login" });
    } catch (error) {
        res.status(500).json({ message: `something went wrong: ${error.message}` });
    }
});


module.exports = router;
