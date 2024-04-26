import { findOne, findRefreshToken } from '../utils/utils.js'

import { ROLES_LIST } from '../config/rolesList.js'
import { updateUserBD } from '../models/usersDB.js'

export const grantRoles = async (req, res) => {
  try {
    const { username, roles } = req.body
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401)
    //datos del solicitante

    if (!username || !roles) return res.sendStatus(401)

    //ver que los roles existen
    const notAllowedRoles = roles
      .map((elem) => ROLES_LIST[elem])
      .some((elem) => elem === undefined)

    if (notAllowedRoles) {
      return res.status(401).json({
        message: 'One or more roles are not allowed'
      })
    }

    //verificamos permisos del que hace la peticion
    const refreshToken = cookies.jwt
    const foundUser = await findRefreshToken(refreshToken)

    const isEditor = roles.find((elem) => elem === 'editor')
    const isAdmin = roles.find((elem) => elem === 'admin')
    const isBanned = roles.find((elem) => elem === 'banned')

    if (!foundUser || !foundUser.roles.admin) return res.sendStatus(401)

    //verificamos que el usuario al que dar permisos exista

    const grantedUser = await findOne(username)

    if (!grantedUser)
      return res.sendStatus(401).json({ message: 'User not found' })
    //siempre mantenemos permiso de usuario

    //comprobar baneado
    const newRoles = {
      user: ROLES_LIST['user'],
      editor: isEditor ? ROLES_LIST['editor'] : undefined,
      admin: isAdmin ? ROLES_LIST['admin'] : undefined,
      banned: isBanned ? ROLES_LIST['banned'] : undefined
    }

    const newUser = grantedUser
    newUser.roles = newRoles

    //incluirlo en BBDD
    const result = await updateUserBD(newUser)

    return res.status(200).json({
      message: 'Roles granted',
      username: result.username,
      roles: Object.keys(result.roles).filter(
        (elem) => result.roles[elem] !== undefined
      )
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
