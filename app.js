 //load variables from env
 require('dotenv').config();
 
 const bodyParser = require('body-parser');

 //import mongoose instant
const mongoose= require ('./configurations/dbconfig')

const userRouts= require ('./routes/userRouts')

const authRouts  = require ('./routes/authRouts')

const productRouts  = require ('./routes/productRouts')


const express = require('express')
const app = express()
app.use(bodyParser.json());

const http = require('http').Server(app)

app.use(express.json())

app.use('/auths', authRouts);
app.use('/api', userRouts);
app.use('/api', productRouts);

app.listen(5000, () => console.log('server started'))








