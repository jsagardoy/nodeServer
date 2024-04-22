import User from '../models/User.js'

export const logoutController = async (req, res) => {
  try {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne(
      (u) => u.refreshToken === refreshToken
    ).exec()

    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None'
        /* secure:true only for PRO */
      })
      res.status(204)
    }

    const newUser = { ...foundUser, refreshToken: '' }

    const result = await User.updateOne(
      foundUser.username === newUser.username,
      newUser
    ).exec()

    if (!result) {
      res.sendStatus(406)
    }
    if (result) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None' /* secure:true only for PRO */
      })
      res.sendStatus(204)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error' })
  }
}
