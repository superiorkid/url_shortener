const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const urlRoute = require('./routes/urlRoute')

require('dotenv').config()

const app = express()
const PORT = 8000

nunjucks.configure('views', {
  autoescape: true,
  express: app
})


app.set('view engine', 'html')

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extented: true
}))
app.use(cors())
app.use(morgan('dev'))


app.use(express.static(__dirname + '/public'))

app.use('/', urlRoute)


// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Database is Connected')

  app.listen(PORT, () => {
    console.log(`Server listen on port : http://localhost:${PORT}`)
  })

})
.catch((err) => console.log(err))
