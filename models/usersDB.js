import { readJSONFile, writeJSONFile } from '../utils/utils.js'

import User from '../models/User.js'

/* export const getUsersDB = async () => await readJSONFile('./models/users.json')
export const setUsersDB = async (data) =>
  await writeJSONFile('./models/users.json', data) */
export const getUsersDB = async () => await readJSONFile('./models/users.json')
export const setUsersDB = async (user) => {
  try {
    return await User.create(user)
  } catch (err) {
    console.error('Error creating user', err)
    return null
  }
}
