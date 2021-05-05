const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://test:test@cluster.rpjbh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected')
})
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello'))

app.listen(port, () => console.log(`example app listening on port ${port}!`))
