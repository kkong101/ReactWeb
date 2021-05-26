const express = require('express')
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product')

var storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, 'uploads/')
    }, 
    filename : function (req,file,cb) {
        cb(null, `${Date.now()}_${file.originalname}` )
    }
})

var upload = multer({storage : storage}).single("file");

router.post('/',(req,res) => {
    console.log('test')
    console.log(req.body)

    const product = new Product(req.body)
    product.save((err) => {
        if(err) {
            return res.status(400).json({success: false, err})
        } else {
            return res.status(200).json({success: true})
        }
    })
})



router.post('/image',(req,res) => {
    upload(req,res, err => {
        if(err) {
            return req.json({ success : false , err})
        }
        
        return res.json({ success: true, filePath :res.req.file.path , fileName: res.req.file.fileName})
    })
})





module.exports = router;