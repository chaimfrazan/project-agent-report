import express from 'express'
import cors from 'cors'
import { disconnect } from './src/db/connect-mongo.js'
import agent from './src/routes/agent.router.js'
import report from './src/routes/reports.router.js'
import admin from './src/routes/admin.router.js'
import fileUpload from 'express-fileupload';


const app = express()
const port = process.env.PORT || 3000

app.use(fileUpload());
app.use(express.json())
app.use(cors())

app.use('/', agent)
app.use('/', report)
app.use('/', admin)




app.listen(port, async () => {
    console.log(`Server is runing on port ${port}...`)
})
process.on("SIGINT", () => disconnect());