import { Router } from "express";
import { agentLogin ,agent } from '../controllers/agent.js'
import { verifyToken } from '../middlewere/requireAuth.js'

const router = Router()

router.post('/login', agentLogin)
router.get('/me', verifyToken ,agent)

export default router