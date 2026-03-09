import { serviceSiginAgents, serviceAllAgents } from '../services/admin.js'

export async function signAgent(req, res, next) {
    try {
        const { agentCode, password, fullName, role } = req.body;
        if (!agentCode || !password || !fullName || !role) {
           return res.status(400).json({
                success: false,
                message: "missing some of things",
            });
        }
        const sigin = await serviceSiginAgents(agentCode, password, fullName, role);
        if (sigin) {
            return res.status(201).json({
                sucess: true,
                user: sigin,
                message: 'created'
            })
        } if (sigin === 'agentCode already exists') {
            res.status(409).json({ success: false, message: "agentCode already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function allAgents(req, res, next) {
    try {
        const agents = await serviceAllAgents()
        if (!agents) {
            res.status(401).json({
                success: false,
                message: "not agents found",
            })
        }
        res.status(200).json({
            success: true,
            user: agents
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}