require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 4000
const cors = require('cors')
app.use(cors())


mongoose.set('strictQuery', false)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*')

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  next()
})

const loginRouter = require('./routes/auth/login')
app.use('/login', loginRouter)

const movieRouter = require('./routes/movie')
app.use('/movie', movieRouter)

const registerRouter = require('./routes/auth/register')
app.use('/register', registerRouter)

const userRoute = require('./routes/user')
const authenticateToken = require('./utils/auth')
app.use('/user', authenticateToken, userRoute)


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests')
  })
})
