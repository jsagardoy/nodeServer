import { findOne, findRefreshToken } from '../utils/utils.js'

import { updateUserBD } from '../models/usersDB.js'

export const inactivateUser = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const admin = await findRefreshToken(refreshToken)
  if (!admin) {
    return res.sendStatus(204)
  }

  const { username } = req.body
  if (!username) {
    return res.sendStatus(401)
  }

  const userToChange = await findOne(username)

  if (!userToChange) {
    return res.sendStatus(401)
  }
  if (userToChange.active) {
    userToChange.active = false

    const updatedUser = await updateUserBD(userToChange)
    if (!updatedUser) {
      return res.sendStatus(401)
    }
    return res.sendStatus(200)
  }
  return res.status(200).json({ message: 'User is already inactive' })
}

export const activateUser = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  const admin = await findRefreshToken(refreshToken)
  if (!admin) {
    return res.sendStatus(204)
  }

  const { username } = req.body
  if (!username) {
    return res.sendStatus(401)
  }

  const userToChange = await findOne(username)

  if (!userToChange) {
    return res.sendStatus(401)
  }
  if (!userToChange.active) {
    userToChange.active = true

    const updatedUser = await updateUserBD(userToChange)
    if (!updatedUser) {
      return res.sendStatus(401)
    }
    return res.sendStatus(200)
  }
  return res.status(200).json({ message: 'User is already active' })
}
