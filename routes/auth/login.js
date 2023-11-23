const { login } = require('../../domain/auth/login')
const express = require('express')
const router = express.Router()

router.post('/', login)

module.exports = router