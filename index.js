const express = require('express')
const app = express()
const port = 3000
const config = require('./config/key')
const mongoose = require('mongoose')
const {User} = require('./models/User')
const {auth} = require('./middleware/auth')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
    .then(() => {
        console.log('MongoDB Successfully Connected')
    })
    .catch(err => console.log(err))

app.get('/', (req,res) => {
    res.send("hello");
})


app.post('/api/users/register', (req,res) => {
    const user = new User(req.body)

    user.save((err,userInfo) => {
        console.log(err)
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
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

// middleware를 통하여 검증 진행
app.get('/api/users/auth', auth , (req,res) => {
   
    // 일치하여 로그인 되면 회원 정도 받기 
    res.status(200).json({
        _id : req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        email : req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })

})

