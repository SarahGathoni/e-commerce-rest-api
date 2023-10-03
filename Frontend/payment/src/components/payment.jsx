import React from "react";
import { useState, useEffect } from "react";
import StripeCheckout from 'react-stripe-checkout';

const KEY = 'pk_test_51NsQOfEl94m1S5b6pAyabOhyBXxCx3ExXEY1YRwCiQiujOhGj8GwSnI8awKq7glULCMcXBHfqVvjIMcDxFh5Ojq900SDjXX34f'

export default function Payment(){
    const [stripeToken, setStripeToken] = useState(null)
    const onToken = (token) => {
        setStripeToken(token);
        // You can send the token to your server for payment processing here

        useEffect(() =>{
            const makeRequest = async() =>{
                try {
                   const res = await axios.post("http://localhost:5000/api/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount:2000

                   })
                } catch (err) {
                    console.log(err)
                }
            }
            stripeToken && makeRequest

        }, [stripeToken])

    };

    return (
        <div className="flex justify-center items-center h-[100vh]">
            <StripeCheckout 
                name="Sara shop"
                billingAddress
                shippingAddress
                description="your total is $30"
                amount={3000}
                token={onToken}
                stripeKey={KEY}
            >
                <button className="bg-black text-white p-20 w-120">Pay Now</button>
            </StripeCheckout>
        </div>
    )
}
