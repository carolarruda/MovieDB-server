const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const secret = process.env.JWT_SECRET

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!email) {
      return res.status(400).json({ error: ['Please enter email address'] })
    }
    if (!password) {
      return res.status(400).json({ error: ['Please enter your password'] })
    }
    if (!user) {
      return res.status(404).json({ error: ['User not found, please Sign up'] })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: ['Wrong password'] })
    }
    const token = jwt.sign({ userId: user._id }, secret)

    res.status(200).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email
      },
      token: token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = { login }
