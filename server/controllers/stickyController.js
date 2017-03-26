'use strict'
const Sticky = require('../models/sticky')
const slug = require('slug')
const methods = {}

methods.getStickys = (req, res, next) => {
  Sticky.find()
    .then((stickys) => {
      res.send(stickys)
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.getOneSticky = (req, res, next) => {
  Sticky.findOne({
    slug: req.params.slug
  })
    .then((sticky) => {
      res.send(sticky)
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.createSticky = (req, res, next) => {
  Sticky.create({
    title: req.body.title,
    content: req.body.content,
    slug: slug(req.body.title).toLowerCase()
  })
    .then((sticky) => {
      res.send({
        sticky: sticky
      })
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.udpateSticky = (req, res, next) => {
  Sticky.findOne({
    slug: req.params.slug
  })
    .then((sticky) => {
      if (!sticky) {
        res.send({
          stickyUndefined: 'Sticky is not found!'
        })
      } else {
        sticky.update({
          title: req.body.title,
          content: req.body.content,
          slug: slug(req.body.title).toLowerCase()
        })
          .then(() => {
            res.send({
              message: `Sticky ${sticky.title} has been updated!`
            })
          })
          .catch((error) => {
            res.send(error)
          })
      }
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.deleteSticky = (req, res, next) => {
  Sticky.findOne({
    slug: req.params.slug
  })
    .then((sticky) => {
      if (!sticky) {
        res.send({
          message: 'Sticky is not found!'
        })
      } else {
        sticky.remove(sticky)
          .then(() => {
            res.send({
              message: `Sticky ${sticky.title} has been deleted!`
            })
          })
          .catch((error) => {
            res.send(error)
          })
      }
    })
    .catch((error) => {
      res.send(error)
    })
}

module.exports = methods
