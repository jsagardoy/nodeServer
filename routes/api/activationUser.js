import {
  activateUser,
  inactivateUser
} from '../../controllers/activationController.js'

import express from 'express'

const router = express.Router()
router.route('/activate').post(activateUser)
router.route('/inactivate').post(inactivateUser)

export default router
