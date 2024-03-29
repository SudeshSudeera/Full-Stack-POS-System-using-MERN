/*
* express (npm i express)
* mongoose (npm i mongoose)
* nodemon (npm i nodemon -g (sudo))
* dotenv (npm i dotenv)
* body-parser (npm i body-parser)
* bcrypt (npm i bcrypt)
* jsonwebtoken (npm i jsonwebtoken) */

const express= require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.SERVER_PORT | 3000;
const app = express();
app.use(cors());

//-----------------------
const userRoute = require('./routes/UserRoute');
const customerRoute = require('./routes/CustomerRoute');
const orderRoute = require('./routes/OrderRoute');
const productRoute = require('./routes/ProductRoute');
//-----------------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

try{
    mongoose.connect('mongodb://127.0.0.1:27017/posapi');
    app.listen(port,() => {
        console.log(`server Started & running on port ${port}`);
    });
}catch (error){
    console.log(error);
}

app.get('/test-api',(req,resp) => {
    return resp.json({'message':'Server Started!'})
});

//---------------
app.use('/api/v1/users',userRoute);
app.use('/api/v1/orders',orderRoute);
app.use('/api/v1/products',productRoute);
app.use('/api/v1/customers',customerRoute);