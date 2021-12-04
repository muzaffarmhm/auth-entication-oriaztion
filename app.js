const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const session = require('express-session')
const path = require('path')

//Middleware

app.set('view engine','ejs')
app.set('views', path.join(__dirname,  'views' ))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000,()=>{
    console.log('Listening at 3000');
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render('register')
})