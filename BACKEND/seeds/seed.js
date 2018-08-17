const mongoose=require('mongoose');
const {productModel}=require('./../Models/product');

const data = require('./../products.json');


data.forEach(element => {
    let newProduct= new productModel(element);
    newProduct.save().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
});


