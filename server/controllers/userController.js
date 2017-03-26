'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const secret = 'mrei91'
const methods = {}

methods.Register = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    email: req.body.email
  })
    .then((user) => {
      if (user) {
        res.send({
          userAlready: 'Username or Email already in used!'
        })
      } else {
        let unique = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*'
        let salt = ''

        for (let i = 0; i < unique.length; i++) {
          salt += unique[Math.floor(Math.random() * unique.length)]
        }

        const hash = crypto.createHmac('sha256', secret).update(req.body.password, salt).digest('hex')

        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hash,
          salt: salt
        })
          .then((user) => {
            res.send(user)
          })
          .catch((error) => {
            res.send({
              message: 'Register user is error',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.send({
        message: 'Error find one',
        error: error
      })
    })
}

methods.Login = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    email: req.body.email
  })
    .then((user) => {
      if (!user) {
        res.send({
          userUndefined: 'User not found!'
        })
      } else {
        const hash = crypto.createHmac('sha256', secret).update(req.body.password, user.salt).digest('hex')

        if (hash === user.password) {
          let token = jwt.sign({
            username: req.body.username,
            email: req.body.email
          }, secret, {})
          res.send({
            token: token
          })
        } else {
          res.send({
            message: 'Password is wrong!'
          })
        }
      }
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.verifyToken = (req, res, next) => {
  let token = req.params.token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      res.send(error)
    } else {
      if (!decoded) {
        res.send({
          username: false,
          email: false
        })
      } else {
        res.send({
          username: true,
          email: true
        })
      }
    }
  })
}

module.exports = methods
