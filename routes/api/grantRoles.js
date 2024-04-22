import { ROLES_LIST } from '../../config/rolesList'
import express from 'express'
import { verifyRoles } from '../../middleware/verifyRoles'

const routes = express.Router()
routes.route('/:username:roles').get('/:username', verifyRoles(ROLES_LIST.admin), grantRoles)