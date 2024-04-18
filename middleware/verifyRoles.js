export const verifyRoles = (...allowRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401)
    const rolesArray = [...allowRoles]
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .some((elem) => elem === true)
    if (!result) return res.sendStatus(401)
    next()
  }
}
