import { getUsersDB, setUsersDB } from '../models/usersDB.js'
import { readFile, writeFile } from 'node:fs/promises'

import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const readJSONFile = async (filePath) => {
  try {
    const rawData = await readFile(filePath, 'utf-8')
    return JSON.parse(rawData)
  } catch (error) {
    console.log('Error reading the file \n', error)
  }
}

export const writeJSONFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data)
    await writeFile(filePath, jsonData)
  } catch (error) {
    console.log('Error writing the file \n', error)
  }
}

export const compareString = (string1, string2) =>
  string1.localeCompare(string2) === 0

export const findOne = async (username) => {
  try {
    return await User.findOne({ username: username }).exec()
  } catch (error) {
    return null
  }
}
export const findOneByEmail = async (email) => {
  try {
    const foundUser = await User.findOne({ email: email }).exec()
    return foundUser !== undefined ? foundUser : false
  } catch (error) {
    return null
  }
}

export const isValidPassword = async (password, checkingPassword) => {
  if (!password || !checkingPassword) return false

  return await bcrypt.compare(password, checkingPassword)
}

export const storeRefreshToken = async (username, refreshToken) => {
  try {
    const users = await getUsersDB()
    const otherUsers = users.filter((u) => u.username !== username)
    const foundUser = users.find((u) => u.username === username)
    if (foundUser) {
      const currentUser = { ...foundUser, refreshToken }
      const newUsers = [...otherUsers, currentUser]
      await setUsersDB(newUsers)
    }
    return
  } catch (error) {
    console.log(`error storing refresh Token`, error)
  }
}
