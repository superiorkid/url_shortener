const validUrl = require('valid-url')
const fetch = require('node-fetch')

const { urlModels } = require('../models/urlModel')
const Form = require('../models/urlModel')
require('dotenv').config()

const getAllData = (req, res) => {

  const allData = urlModels.find().sort({createAt: -1})
  .then(result => {
    res.status(200).render('index', {
      result,
      title: "Show All Data"
    })
  })
  .catch(err => {
    res.status(400).send(err)
  })


}

const get_data_byCode = (req, res) => {

  const code = req.params.code

  urlModels.findOne({code})
  .then(result => {
    res.status(200).send(result)
  })
  .catch(err => {
    res.status(400).send(err)
  })

}

const submission = (req, res) => {
  res.render('add_data')
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
          res.status(409).send('Data is available')
        } else {
          const newUrl = new urlModels({
            code: data.result.code,
            short_link: data.result.short_link,
            full_short_link: data.result.full_short_link,
            original_link: data.result.original_link
          })

          newUrl.save()
          res.status(201).redirect('/')
        }
      })

    })
    .catch(err => res.status(500).send(err))

  } else {

    req.flash('info', 'URL not valid')
    res.status(400).redirecT('/add')

    // res.status(400).send('URL not valid')
  }

}


const delete_url = (req, res) => {

  const code = req.params.code

  urlModels.findOneAndDelete({code})
  .then(result => {
    console.log('Delete Successfully');
    res.status(200).redirect('/')
  })
  .catch(err => {
    res.status(404).send(err)
  })

}


module.exports = {
  getAllData,
  shorting,
  delete_url,
  get_data_byCode,
  submission
}
