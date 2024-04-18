import { getUsersDB, setUsersDB } from '../models/usersDB.js'
export const logoutController = async (req, res) => {
  try {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt

    const users = await getUsersDB()
    console.log(users)
    const foundUser = users.find((u) => u.refreshToken === refreshToken)
    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None'
        /* secure:true only for PRO */
      })
      res.status(204)
    }

    const restUsers = users.filter((u) => u.username !== foundUser.username)

    const newUser = { ...foundUser, refreshToken: '' }

    await setUsersDB([...restUsers, newUser])

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None' /* secure:true only for PRO */
    })
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
}
