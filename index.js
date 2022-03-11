const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const urlRoute = require('./routes/urlRoute')

require('dotenv').config()

const app = express()
const PORT = 8080


// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Database is connected'))
  .catch((err) => console.log(err))


app.use(bodyParser.json())
app.use(cors())


app.use('/url', urlRoute)

app.get('/', (req, res) => {
  res.send('Hello world from homepage')
})

app


app.listen(PORT, () => {
  console.log(`Server listen on port : http://localhost:${PORT}`)
})
