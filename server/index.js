const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')
const mongoose = require('mongoose')
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
    res.send("Server Page");
})



// router 
app.use('/api/product', require('./routes/product'))
app.use('/api/users', require('./routes/users'))
app.use('/uploads', express.static('uploads'))