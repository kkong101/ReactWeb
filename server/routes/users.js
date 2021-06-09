const express = require('express');
const router = express.Router();

const { Product } = require('../models/Product');
const {User} = require('../models/User');
const {auth} = require('../middleware/auth');


router.get("/auth" , auth , (req,res) => {
    res.status(200).json({
        _id : req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email : req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

router.post("/register" , (req,res) => {
    const user = new User(req.body)

    user.save((err,userInfo) => {
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if(!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "Don't have user information"
            })
        }

        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.json({ loginSuccess: false, message: "Wrong password"});
            userInfo.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                res.cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id});
            })
        })
    })
})

router.get("/logout" , auth , (req,res) => {
    User.findOneAndUpdate({ _id: req.user._id}, {token: "", tokenExp: ""}, (err, user) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        })
    })
})

router.get('/addToCart', auth, (req, res) => {

    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        let duplicate = false;

        console.log(userInfo)

        userInfo.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })


        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.query.productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: req.query.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
});

module.exports = router;