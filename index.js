const express = require('express')
const app = express()
const port = 3000
const config = require('./config/key')
const mongoose = require('mongoose')
const {User} = require('./models/User')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(config.MONGO_URI, {
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

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if(!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "Don't have user information"
            })
        }

        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "Wrong password"});
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                res.cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id});
            })
        })
    })
})



