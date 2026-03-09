import { Router } from "express";
import { signAgent, allAgents } from '../controllers/admin.js'
import { verifyToken, verifyAdmin } from '../middlewere/requireAuth.js'

const router = Router()

router.get('/users', verifyToken, verifyAdmin, allAgents)
router.post('/users', verifyToken, verifyAdmin, signAgent)

export default router