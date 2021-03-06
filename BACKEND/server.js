let env=process.env.NODE_ENV || 'development';
console.log(env);
if(env==='development'){
    process.env.PORT=2000;
    process.env.MONGODB_URL="mongodb://localhost:27017/Products";
}
//////////////////////////
const mongoose=require('./db/mongoose');
const {productModel}=require('./Models/product');
const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//////////////////////////


let port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/searchName/:line',(req,res)=>{

    productModel.find({$or:[
        { "name": { "$regex": req.params.line, "$options": "i" }},
        {"category.name": { "$regex": req.params.line, "$options": "i" }},
        { "brand": { "$regex": req.params.line, "$options": "i" }}
    ] }
    ).limit(10)
     .then((docs)=>{
         if(!docs){
        res.status(404).send();
         }else{
        res.status(200).send(docs);
         }
    }).catch((err)=>{
        res.status(400).send(err)
    });

    

});


app.listen(port,()=>{
    console.log('server started');
});