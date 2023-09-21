const router = require('express').Router();
const CryptoJS = require("crypto-js");
const User = require("../models/users"); // Assuming you have a User model

const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require('./verifyToken');

// UPDATE USER
router.put('/:id', verifyTokenAuth, async function(req, res){
    //check if password is updated, encrypt provided password 1st
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedUser);
          } catch (err) {
            res.status(500).json(err);
          }
        });

// GET USER BY ID
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password"); // Exclude password from the response
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL USERS
router.get('/', verifyTokenAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE USER BY ID
router.delete('/:id', verifyTokenAuth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET USER STATS... NUMBER OF USERS PER MONTH (Consider using a different route path)
router.get('/stats', async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: '$createdAt' } } },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
