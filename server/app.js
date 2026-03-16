import express from 'express'
import cors from 'cors'
import { disconnect } from './src/db/connect-mongo.js'
import agent from './src/routes/agent.router.js'
import report from './src/routes/reports.router.js'
import admin from './src/routes/admin.router.js'
import fileUpload from 'express-fileupload';


const app = express()
const port = 3001

app.use((req, res, next) => {
console.log(req.method, req.url)
next()})

app.use(express.json())
app.use(fileUpload());
app.use(cors())

app.use('/auth', agent)
app.use('/reports', report)
app.use('/admin', admin)




app.listen(port, () => {
    console.log(`Server is runing on port ${port}...`)
})
process.on("SIGINT", () => disconnect());