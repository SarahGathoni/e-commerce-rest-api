const router = require('express').Router();
const stripe = require('stripe')(process.env.SRIPE_KEY)

router.post('./payment', (req,res) =>{
    stripe.charges.create({
        source: req.body.id,
        amount:req.body.amout,
        currency:'usd'
    }, (stripeErr, stripeRes) =>{
        if(stripeErr)
        {res.status(500).json(stripeErr)}else{
            res.status(200).json(stripeRes)
        }
    }

    )
})

module.exports = router