const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const session = require('express-session')
const path = require('path')
const User = require('./models/users')

mongoose.connect('mongodb://localhost:27017/auth')
    .then(()=> console.log('Mongo DB connected successfully..'))
    .catch((err)=>console.log(err))

//Middleware

app.set('view engine','ejs')
app.set('views', path.join(__dirname,  'views' ))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))


app.listen(3000,()=>{
    console.log('Listening at 3000');
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',(req,res)=>{
    
    const {password} = req.body
    bcrypt.hash(password,12, function(err, hash){
        const user = new User(
            req.body
        )
        user.password = hash
        console.log(user)
        user.save()
    })
    res.send('Login Page')
})