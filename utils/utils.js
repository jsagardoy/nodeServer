import { readFile, writeFile } from 'node:fs/promises'

import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { error } from 'node:console'

export const readJSONFile = async (filePath) => {
  try {
    const rawData = await readFile(filePath, 'utf-8')
    return JSON.parse(rawData)
  } catch (error) {
    console.error('Error reading the file \n', error)
  }
}

export const writeJSONFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data)
    await writeFile(filePath, jsonData)
  } catch (error) {
    console.error('Error writing the file \n', error)
  }
}

export const compareString = (string1, string2) =>
  string1.localeCompare(string2) === 0

export const findOne = async (username) => {
  try {
    const foundUser = await User.findOne({ username: username }).exec()
    if (!foundUser) {
      throw error
    }
    return foundUser
  } catch (error) {
    console.log(error)
    return null
  }
}
export const findOneByEmail = async (email) => {
  try {
    const foundUser = await User.findOne({ email: email }).exec()
    if (!foundUser) {
      throw error
    }
    return foundUser
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
    const foundUser = await User.findOneAndUpdate(
      { username: username },
      { refreshToken: refreshToken }
    ).exec()

    if (!foundUser) {
      throw error
    }
  } catch (error) {
    console.error(`Error storing refresh Token`, error)
  }
}
export const findRefreshToken = async (refreshToken) => {
  try {
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!foundUser) {
      throw error
    }

    return foundUser
  } catch (error) {
    console.error(error)
    return null
  }
}
