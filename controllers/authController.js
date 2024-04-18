import { findOne, isValidPassword, storeRefreshToken } from '../utils/utils.js'

import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {
  try {
    //datos informados
    if (!req.body) {
      return res.status(406).send({ error: 'No se proporcionaron datos.' })
    }

    //se recuperan los datos
    const { username, password } = req.body

    //datos rellenos
    if (!username || !password) {
      return res.status(400).json({ message: 'Incorrect user and password' })
    }

    const user = await findOne(username)
    //usuario no encontrado
    if (!user) {
      res.status(401).send('User not found')
    }
    //usuario encontrado

    const match = await isValidPassword(password, user.password)

    //password incorrecto
    if (!match) {
      return res.status(403).send({ auth: false, token: null })
    }

    if (match) {
      // Create a token

      const roles = Object.values(user.roles)

      roles.length === 0 ? roles.push({ user: 3003 }) : roles

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            email: user.email,
            roles: roles
          }
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '15m'
        }
      )

      //create refreshToken

      const refreshToken = jwt.sign(
        {
          username: user.username
        },
        process.env.REFRESH_ACCESS_TOKEN,
        {
          expiresIn: '1d'
        }
      )

      storeRefreshToken(user.username, refreshToken)

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000
      })
      res.json({ accessToken })
    }
  } catch (error) {
    res.status(500).send('Error in the server')
  }
}
