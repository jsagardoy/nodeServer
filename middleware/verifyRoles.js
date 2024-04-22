export const verifyRoles = (...allowRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401)

    const rolesValues = Object.values(req.roles)
    const rolesArray = [...allowRoles]

    const result = rolesValues
      .map((role) => rolesArray.includes(role))
      .some((elem) => elem === true)
    if (!result) return res.sendStatus(401)

    next()
  }
}
