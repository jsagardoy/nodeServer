import { findOne } from '../utils/utils.js'
import { getUsersDB } from '../models/usersDB.js'
export const getUsers = async (req, res) => {
  try {
    const users = await getUsersDB()
    res.statusCode = 200
    return res.end(JSON.stringify(users, null, 2))
  } catch (err) {
    return res.status(400).JSON({ message: err.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const { username } = req.params

    const user = await findOne(username)

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    res.statusCode = 200
    return res.end(JSON.stringify(user, null, 2))
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
