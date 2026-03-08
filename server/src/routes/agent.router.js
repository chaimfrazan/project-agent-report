import { Router } from "express";
import { agentLogin ,agent } from '../controllers/agent.js'
import { token } from '../middlewere/requireAuth.js'

const router = Router()

router.post('/auth/login', agentLogin)
router.get('/auth/me', token ,agent)

export default router