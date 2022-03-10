const shortid = require('shortid')
const validUrl = require('valid-url')

const { Url } = require('../models/urlModel')
require('dotenv').config({path: './.env'})


const get_all_url = (req, res) => {

  Url.find().sort({createdAt: -1})
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })

}


const shorting = async (req, res) => {

  const longURL = req.body
  const base = process.env.BASE_URI
  const urlId = shortid.generate()
  
  if (validUrl.isUri(longURL)) {

    try {
      const url = await Url.findOne({longURL})

      if (url) {

        res.json(url)

      } else {
        
        const shortURL = `${base}/${urlId}`

        url = new Url({
          longURL,
          shortURL
        })

        await url.save
        res.json(url)

      }
    } catch(err) {
      console.log(err)
      res.status(500).json('server error')
    }

  } else {

    res.status(400).json('invalid original url')

  }
  

}


module.exports = {
  shorting, 
  get_all_url
}