import { serviceAgent, serviceAgentLogin } from '../services/agent.js'

export async function agentLogin(req, res) {
    try {
        const { agentCode, password } = req.body
        if (!password || !agentCode) {
            res.status(400).json({
                sucess: false,
                message: "missing agentCode or password",
            })
        }
        const login = await serviceAgentLogin(agentCode, password)
        if (login) {
            res.status(200).json({
                sucess: true,
                token: login.token,
                user: login.user
            })
        }
        if (login === 'user not found') {
            res.status(401).json({
                sucess: false,
                message: 'agent not found'
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
        const { agentCode } = req.body
        const agent = serviceAgent(agentCode)
        res.status(200).json({ agent })

    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}