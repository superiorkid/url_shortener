const mongoose = require('mongoose')
const { Schema } = mongoose

const urlSchema = new Schema({

  code: String,
  short_link: String,
  full_short_link: String,
  original_link: String

}, {
  timestamps: true
})

const urlModels = mongoose.model("urls", urlSchema)

module.exports = { urlModels }
