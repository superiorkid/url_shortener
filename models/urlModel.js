const mongoose = require('mongoose')
const { Schema } = mongoose

const urlSchema = new Schema({
  longURL : {
    type: String, required:true
  },
  shortURL : {
    type: String, required:true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Url = mongoose.model('urlSchema', urlSchema)

module.exports = { Url }