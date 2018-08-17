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
//////////////////////////



let port = process.env.PORT;
const app = express();
app.use(bodyParser.json());


app.get('/searchName/:line',(req,res)=>{

    productModel.find(
        { "name": { "$regex": req.params.line, "$options": "i" } }
    ).limit(10)
     .then((docs=>{
        console.log("done");
        res.send(docs);
    })).catch((err)=>{
        res.status(404).send(err)
    });

    console.log('passedhere');

});


app.listen(port,()=>{
    console.log('server started');
});