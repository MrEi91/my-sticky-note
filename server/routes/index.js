'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.post('/register', controller.Register)
router.post('/login', controller.Login)
router.get('/verify/:token', controller.verifyToken)

module.exports = router
