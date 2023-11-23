const { createUser } = require('../../domain/auth/register')
const express = require('express')
const router = express.Router()


router.post('/', createUser)

module.exports = router
