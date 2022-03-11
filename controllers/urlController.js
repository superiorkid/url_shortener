const validUrl = require('valid-url')
const fetch = require('node-fetch')

const { urlModels } = require('../models/urlModel')
require('dotenv').config()

const getAllData = (req, res) => {

  urlModels.find().sort({createAt: -1})
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(400).send(err)
    })

}


const shorting = (req, res) => {
  const original_link = req.body.original_link
  const url = process.env.BASE_URI + 'shorten?url=' + original_link

  if (validUrl.isUri(url)) {

    fetch(url)
    .then(response => response.json())
    .then(data => {


      const query = urlModels.where({original_link})

      query.findOne((err, urls) => {
        if (urls) {
          res.send('Data is available')
        } else {
          const url = new urlModels({
            code: data.result.code,
            short_link: data.result.short_link,
            full_short_link: data.result.full_short_link,
            original_link: data.result.original_link
          })

          url.save()
          res.status(201).send(url)
        }
      })

    })
    .catch(err => res.send(err))

  } else {
    res.send('URL not valid')
  }

}





module.exports = { getAllData, shorting }
