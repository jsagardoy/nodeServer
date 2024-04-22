import User from '../models/User.js'

export const logoutController = async (req, res) => {
  try {
    const cookies = req.cookies

    if (!cookies?.jwt) {
      return res.json({ message: 'No token found' }).status(204)
      /* return res.status(204).json({ message: 'No token found' }) */
    }

    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec()

    if (!foundUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None'
        /* secure:true only for PRO */
      })
      return res.json({ message: 'No user found' }).status(204)
    }

    const result = await User.updateOne(
      { username: foundUser.username },
      { refreshToken: '' }
    ).exec()

    if (!result) {
      return res.sendStatus(406)
    }
    if (result) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None' /* secure:true only for PRO */
      })
      return res
        .json({ message: `${foundUser.username} logged out` })
        .status(204)
    }
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Server error' }).status(500)
  }
}
