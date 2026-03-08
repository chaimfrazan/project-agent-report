import { Router } from "express";
import { token } from '../middlewere/requireAuth.js'
import { createReport, importCsv } from '../controllers/report.js'

const router = Router()

router.post('/reports', token, createReport)
router.post('/reports/csv', token, importCsv)

export default router