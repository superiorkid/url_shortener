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
  const message = req.flash('info') || req.flash('success')

  res.render('add_data', {
    title: "Add Data",
    message
  })
}

const shorting = (req, res) => {

  const original_link = req.body.original_link
  const url = process.env.BASE_URI + 'shorten?url=' + original_link

  if (!validUrl.isUri(original_link)) {
    req.flash("info", "URL not valid")
    res.redirect('/add')
  } else {
    fetch(url)
    .then(response => response.json())
    .then(data => {

      const query = urlModels.where({original_link})

      query.findOne((err, urls) => {
        if (urls) {
          req.flash('info', 'Data is Available')
          res.status(409).redirect('/add')
        } else {
          const newUrl = new urlModels({
            code: data.result.code,
            short_link: data.result.short_link,
            full_short_link: data.result.full_short_link,
            original_link: data.result.original_link
          })

          newUrl.save((err) => {
            if (err) {
              console.log(err)
            }
            console.log('Data was save successfully')
            req.flash('success', 'Data was save successfully')
            res.redirect('/add')
          })
        }
      })

    })
    .catch(err => res.status(500).send(err))

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
