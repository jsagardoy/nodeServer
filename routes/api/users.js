import { getUser, getUsers } from '../../controllers/usersController.js'

import { ROLES_LIST } from '../../config/rolesList.js'
import express from 'express'
import { verifyRoles } from '../../middleware/verifyRoles.js'

const router = express.Router()
router.route('/').get(getUsers)

router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), getUser)

export default router
