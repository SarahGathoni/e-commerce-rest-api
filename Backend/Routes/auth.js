const router = require('express').Router();
const User = require("../models/users"); //import userSchema from models
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt')

//REGISTER ...post request-getting data from user
router.post('/register', async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
    })
    try{
        const savedUser = await newUser.save() //save the new registered user to DB
        res.status(201).json(savedUser)

        
        
 
    }
    catch(err){ res.status(500).json(err)}
    

})

//LOGIN
router.post('/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }

    try {
        const foundUser = await User.findOne({ username: user });
        console.log('Received username:', user);

        if (!foundUser) {
            return res.status(401).json({ 'message': 'Wrong credentials' });
        }

        const decryptedPassword = CryptoJS.AES.decrypt(
            foundUser.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== password) {
            return res.status(401).json({ 'message': 'Wrong password' });
        }

        const accessToken = jwt.sign(
            {
                id: foundUser._id,
                isAdmin: foundUser.isAdmin
            },
            process.env.JWT_KEY,
            { expiresIn: '3d' }
        );

        const { password, ...userWithoutPassword } = foundUser._doc;
        res.status(200).json({ ...userWithoutPassword, accessToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ 'message': 'Internal server error' });
    }
});