import express from 'express'
import { grantRoles } from '../../controllers/grantRolesController.js'

const router = express.Router()
router.route('/').post(grantRoles)
export default router
