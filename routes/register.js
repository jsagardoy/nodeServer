import express from 'express'
import { signupController } from '../controllers/registerController.js'

const router = express.Router()
router.post('/', signupController)

export default router
