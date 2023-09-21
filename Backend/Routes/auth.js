const router = require('express').Router();
const User = require("../models/users"); //import userSchema from models
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
//const user = require('../models/user');

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
/*router.post('/login', async(req,res) =>{
   //find username and password from the User DB;modeled in models.user.js
   try{
        const user = await user.findOne({username:req.body.username});
        //if no user found in DB
        if(!user){res.status(401).json('wrong credentials')}
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)

        //convert passwprd to string
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
         originalPassword !== req.body.password && res.status(401).json('wrong credentials')
         
         
         //verify the logged in user using jwt
        //we store the userId and isAdmin in the jwt token

         const accessToken = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
         },
         process.env.JWT_KEY,
         {expiresIn:'3d'}
         )
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

         

   }catch(err){
    res.status(500).json(err);
   }
})*/
router.post('/login', async (req, res) => {
    try {
        const userRecord = await User.findOne({
            username: req.body.username,
        });

        if (!userRecord) {
            return res.status(401).json("Wrong Username");
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            userRecord.password,
            process.env.PASS_SECRET
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
            {
                id: userRecord._id,
                isAdmin: userRecord.isAdmin,
            },
            process.env.JWT_KEY, // Use the correct environment variable name
            { expiresIn: "3d" }
        );

        const { password, ...others } = userRecord._doc;
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;