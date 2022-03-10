const validUrl = require('valid-url')
const fetch = require('node-fetch')

const { urlModels } = require('../models/urlModel')
require('dotenv').config()

const getAllData = (req, res) => {

  urlModels.find().sort({createdAt: -1})
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send(err)
    })

}


const shorting = async (req, res) => {
  const original_link = req.body.original_link
  const url = process.env.BASE_URI + 'shorten?url=' + original_link

  if (validUrl.isUri(url)) {

    fetch(url)
    .then(response => response.json())
    .then(data => {

      const urls = urlModels.findOne({original_link: original_link})

      if (urls) {
        res.send("data is available")
      } else {
        const url = new urlModels({
          code: data.result.code,
          short_link: data.result.short_link,
          full_short_link: data.result.full_short_link,
          original_link: data.result.original_link
        })

        url.save()
        res.send(url)
      }

      // const url = new urlModels({
      //   code: data.result.code,
      //   short_link: data.result.short_link,
      //   full_short_link: data.result.full_short_link,
      //   original_link: data.result.original_link
      // })

      // url.save()
      // res.send(url)


    })
    .catch(err => res.send(err))

  } else {
    res.send('URL not valid')
  }

}

module.exports = { getAllData, shorting }
