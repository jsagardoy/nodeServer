import { ROLES_LIST } from '../../config/rolesList.js'
import express from 'express'
import { grantRoles } from '../../controllers/grantRolesController.js'
import { verifyRoles } from '../../middleware/verifyRoles.js'

const router = express.Router()
router.route('/').post(verifyRoles(ROLES_LIST.admin), grantRoles)
export default router
