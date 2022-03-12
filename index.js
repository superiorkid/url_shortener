const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nunjucks = require('nunjucks')
// const chokidar = require('chokidar')

const urlRoute = require('./routes/urlRoute')

require('dotenv').config()

const app = express()
const PORT = 8080

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// chokidar.watch('.').on('all', (event, path) => {
//   console.log(event, path)
// })

app.set('view engine', 'html')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))


app.use(express.static(__dirname + '/public'))

app.use('/url', urlRoute)

app.get('*', (req, res) => {
  res.send('What??', 404)
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
