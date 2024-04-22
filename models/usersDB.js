import User from '../models/User.js'

export const getUsersDB = async () => {
  try {
    return await User.find({}).exec()
  } catch (error) {
    console.error('Error retreaving data from Database', error)
    return null
  }
}
export const setUsersDB = async (user) => {
  try {
    console.log(user)
    return await User.create(user).exec()
  } catch (err) {
    console.error('Error creating user', err)
    return null
  }
}
