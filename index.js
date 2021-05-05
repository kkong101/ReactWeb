const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://test:test@cluster.rpjbh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
    .then(() => {
        console.log('MongoDB Successfully Connected')
    })
    .catch(err => console.log(err))


app.post('/register', (req,res) => {
    const user = new User(req.body)
    user.save((err,userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})