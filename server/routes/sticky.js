'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/stickyController')

router.get('/sticky', controller.getStickys)
router.get('/sticky/:slug', controller.getOneSticky)
router.post('/sticky', controller.createSticky)
router.put('/sticky/:slug', controller.udpateSticky)
router.delete('/sticky/:slug', controller.deleteSticky)

module.exports = router
