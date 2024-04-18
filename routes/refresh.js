import express from 'express'
import { handleRefreshTokenController } from '../controllers/refreshController.js'

const router = express.Router()
router.get('/', handleRefreshTokenController)

export default router
