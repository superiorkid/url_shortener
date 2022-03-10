const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const urlRouter = require('./routes/urlRoute')
require('dotenv').config({path: './.env'})

const app = express()
const PORT = 8080

// connect to mongodb database
mongoose.connect(process.env.MONGO_URI, {useNewURLParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Database is conected')
  })
  .catch(err => {
    console.log(err)
  })


// third-party middleware
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/url', urlRouter)

app.get('/', (req, res) => {
  res.send('Hello world from homepage')
})


app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`)
})