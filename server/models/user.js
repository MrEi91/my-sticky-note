'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../config/db')

let userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String
}, {
  timetamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User
