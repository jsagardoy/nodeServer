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
    const { id } = req.params
    const users = await getUsersDB()
    const user = users.find((user) => user.id === id)

    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    res.statusCode = 200
    return res.end(JSON.stringify(user, null, 2))
  } catch (err) {
    return res.status(400).JSON({ message: err.message })
  }
}
