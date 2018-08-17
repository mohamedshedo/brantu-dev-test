const mongoose = require('mongoose');


let productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        id:{type:Number},
        name:{type:String}
        
    },
    brand:{
        type:String
    }
});

let productModel=mongoose.model('Product',productSchema);
module.exports={productModel};
