import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { getDb } from "../db/connect-mongo.js";

dotenv.config();
const db = await getDb();
const collection = await db.collection("agents");

export async function serviceAgentLogin(agentCode, password) {
    const agent = await collection.findOne({ agentCode });
    if (agent) {
        const pass = await bcrypt.compare(password, agent.password);
        if (pass) {
            const secret = process.env.SECRET_TOKEN;
            const token = jwt.sign(
                {
                    id: agent._id,
                    agentCode: agent.agentCode,
                    role: agent.role,
                },
                secret,
                { expiresIn: "1h" }
            );
            return {
                token, user: {
                    id: agent._id,
                    agentCode: agent.agentCode,
                    fullName: agent.fullName,
                    role: agent.role
                }
            };
        } else return "wrong password";
    } else return "user not found";
}

export async function serviceAgent(agentCode) {
    const agent = await collection.findOne({ agentCode });
    return {
        user: {
            id: agent._id,
            agentCode: agent.agentCode,
            fullName: agent.fullName,
            role: agent.role
        }
    };
}