const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/urlRoute')

require('dotenv').config()

const app = express()
const PORT = 8000

nunjucks.configure('views', {
  autoescape: true,
  express: app
})


app.set('view engine', 'njk')

app.use(bodyParser.json()) // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extented: true
}))
app.use(cors())
app.use(morgan('dev'))

// express-session
app.use(session({cookie: {maxAge: 60000}, secret: "secret"}))
app.use(cookieParser('secret'))
app.use(flash())


// app.use(express.static(__dirname + '/public'))

app.use('/', urlRoute)

app.all('/flash', (req, res) => {
  req.flash('success', "it worked")
  res.redirect('/add')
})


// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log('Database is Connected')

  app.listen(PORT, () => {
    console.log(`Server listen on port : http://localhost:${PORT}`)
  })

})
.catch((err) => console.log(err))
