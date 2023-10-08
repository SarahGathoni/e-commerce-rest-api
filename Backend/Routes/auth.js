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
    try{
        const user = await User.findOne(
            {
                userName: req.body.user_name
            }
        );

        
        if(!user){
            res.status(401).json('wrong credentials')
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SECRET
        );
        console.log('Hashed Password:', hashedPassword);


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        console.log(originalPassword)

        
            if(originalPassword !== req.body.password)return
                console.log('Request Password:', req.body.password);
                res.status(401).json("wrong password")
                
            

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router;