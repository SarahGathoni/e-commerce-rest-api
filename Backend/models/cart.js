const mongoose = require('mongoose');


const CartSchema  = new mongoose.Schema({
    userId:{type:String, required:true, unique:true},
    product:[
        {productId:{type:String}},
        {quantity:{type:Number, default:1}}
    ]
},
{timestamps:true}  //shows the time created and updated
)

module.exports = mongoose.model('Cart', CartSchema);