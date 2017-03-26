'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../config/db')

let stickySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
}, {
  timetamps: true
})

let Sticky = mongoose.model('Sticky', stickySchema)

module.exports = Sticky
