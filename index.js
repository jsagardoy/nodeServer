import { ROLES_LIST } from './config/rolesList.js'
import activationUser from './routes/api/activationUser.js'
import bodyParser from 'body-parser'
import { connectDB } from './config/dbConnection.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
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
import { verifyRoles } from './middleware/verifyRoles.js'

dotenv.config()

connectDB()
const app = express()
//middleware for cookies
const hostname = '127.0.0.1'
const port = 5001
app.use(credentials)
// Cross Origin Resource Sharing
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.use('/login', login)
app.use('/signup', signup)
app.use('/refresh', refresh)
app.use('/logout', logout)

//validate JWT y acciones solo para usuarios logados
app.use(verifyJWT)
app.use('/users', users)

//acciones solo para administradores logados
app.use(verifyRoles(ROLES_LIST.admin))
app.use('/admin', grantRoles)
app.use('/activationUser', activationUser)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ \n`)
  })
})
