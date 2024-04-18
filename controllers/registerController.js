import { compareString, findOne, findOneByEmail } from '../utils/utils.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { setUsersDB } from '../models/usersDB.js'
import validator from 'validator'

export const signupController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(406).send({ error: 'No incomming data' })
    }

    const { username, password, confirmPassword, email } = req.body

    if (!username || !password || !email || !confirmPassword) {
      return res.status(400).send('Username, password and email, are required')
    }

    if (!compareString(password, confirmPassword)) {
      return res.status(400).send('Passwords do not match')
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send('Email is not valid')
    }
    const user = await findOne(username)
    if (user) {
      return res.status(401).send('User already exists')
    }
    const emailExists = await findOneByEmail(email)
    if (emailExists) {
      return res.status(401).send('Email already in use')
    }
    const hashedPassword = bcrypt.hashSync(password, 12)

    const newUser = {
      username,
      password: hashedPassword,
      email
    }
    //create and save newUser
    const createUserInDB = await setUsersDB(newUser)
    if (!createUserInDB) {
      return res.status(422).send('Cound not process the request')
    }
    // Create a token
    const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN, {
      expiresIn: '1h'
    })
    res
      .status(201)
      .json({ message: `${username} has been created`, token: token })
  } catch (error) {
    res.status(500).send('Error in the server')
  }
}
