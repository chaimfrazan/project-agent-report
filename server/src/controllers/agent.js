import { serviceAgent, serviceAgentLogin } from '../services/agent.js'

export async function agentLogin(req, res) {
    try {
        const { agentCode, password } = req.body
        if (!password || !agentCode) {
            return res.status(400).json({
                sucess: false,
                message: "missing agentCode or password",
            })
        }
        const login = await serviceAgentLogin(agentCode, password)
        if (login === 'user not found') {
            return res.status(401).json({
                sucess: false,
                message: 'agent not found'
            })
        }
        else if (login === "wrong password") {
            return res.status(403).json({
                sucess: false,
                message: "wrong password try again...",
            })
        }
        else {
            return res.status(200).json({
                sucess: true,
                token: login.token,
                user: login.user
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

export async function agent(req, res) {
    try {
        const { agentCode } = req.user
        const agent = serviceAgent(agentCode)
        res.status(200).json({ agent })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}