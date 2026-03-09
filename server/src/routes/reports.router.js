import { Router } from "express";
import { verifyToken } from '../middlewere/requireAuth.js'
import { createReport, importCsv, getReports, getReport } from '../controllers/report.js'
import imageUpload from '../middlewere/uploadImg.js'

const router = Router()

router.post('/', verifyToken, imageUpload.single('image'), createReport)
router.post('/csv', verifyToken, importCsv)
router.get('/', verifyToken, getReports)
router.get('/:id', verifyToken, getReport)

export default router