import bodyParser from 'body-parser'
import { connectDB } from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
import { credentials } from './middleware/credentials.js'
import dotenv from 'dotenv'
import express from 'express'
import grantRoles from './routes/api/grantRoles.js'
import login from './routes/login.js'
import logout from './routes/logout.js'
import mongoose from 'mongoose'
import refresh from './routes/refresh.js'
import signup from './routes/register.js'
import users from './routes/api/users.js'
import { verifyJWT } from './middleware/verifyJWT.js'

dotenv.config()

connectDB()
const app = express()
//middleware for cookies
app.use(cookieParser())
const hostname = '127.0.0.1'
const port = 3000
app.use(credentials)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use('/login', login)
app.use('/signup', signup)
app.use('/refresh', refresh)
app.use('/logout', logout)

//validate JWT
app.use(verifyJWT)
app.use('/users', users)
app.use('/admin', grantRoles)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ \n`)
  })
})
