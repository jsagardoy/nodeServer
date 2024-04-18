import dotenv from 'dotenv'
import { getUsersDB } from '../models/usersDB.js'
import jwt from 'jsonwebtoken'

export const handleRefreshTokenController = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)

  const refreshToken = cookies.jwt

  const users = await getUsersDB()
  const foundUser = users.find((person) => person.refreshToken === refreshToken)

  if (!foundUser) return res.sendStatus(403)

  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403)
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          email: foundUser.email,
          roles: foundUser.roles
        }
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '15m'
      }
    )
    res.json({ accessToken })
  })
}
