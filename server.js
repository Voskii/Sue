const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
var { expressjwt: jwt } = require('express-jwt')
require('dotenv').config()
uri = process.env.URI
const path = require('path')

process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'client', 'build')))
mongoose.set('strictQuery', false)

mongoose.connect(uri, console.log('Connected to DB'))

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))

app.use('/api/meal', require('./routes/mealRouter.js'))
app.use('/api/stat', require('./routes/statRouter.js'))
app.use('/api/dub', require('./routes/dubRouter.js'))
app.use('/api/fav', require('./routes/favRouter.js')) 
app.use('/api/counter', require('./routes/counterRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(9000, () => {
    console.log('Server is running on local port 9000')
})