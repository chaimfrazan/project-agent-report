import { Router } from "express";
import { signAgent, allAgents } from '../controllers/admin.js'
import { verifyAdmin } from '../middlewere/requireAuth.js'

const router = Router()

router.post('/admin/users', verifyAdmin, signAgent)
router.get('/admin/users', verifyAdmin, allAgents)

export default router