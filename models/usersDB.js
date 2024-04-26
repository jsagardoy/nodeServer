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
    console.log('user', user)
    return await User.create(user)
  } catch (err) {
    console.error('Error creating user', err)
    return null
  }
}

export const updateUserBD = async (user) => {
  try {
    return await User.findOneAndUpdate({ username: user.username }, user, {
      new: true
    })
  } catch (error) {
    console.error('Error updating user', error)
    return null
  }
}
