const bcrypt = require('bcrypt')
const User = require('../../models/user')
const saltRounds = 12
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const createUser = async (req, res) => {

  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(409)
        .json({ errors: ['Email is already in use, please login'] })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      email,
      password: hash
    })
    delete user.password
    const newUser = await user.save()
    console.log(user)
    const token = jwt.sign({ email }, secret)
    res.status(201).json({
      user: {
        email: newUser.email
      },
      token: token
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createUser }
