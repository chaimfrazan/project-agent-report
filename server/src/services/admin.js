import { getDb } from "../db/connect-mongo.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const db = await getDb();
const collection = await db.collection("agents");

export async function serviceSiginAgents(agentCode, password, fullName, role) {
    try {
        const exisUser = await collection.findOne({ agentCode });
        if (exisUser) {
            return ("agentCode already exists");
        }
        const hashPass = await bcrypt.hash(password, 12);
        await collection.insertOne({
            agentCode: agentCode,
            password: hashPass,
            fullName: fullName,
            role: role,
            createdAt: new Date(),
        });
        const agent = await collection.findOne({ agentCode });
        return {
            user: {
                id: agent._id,
                agentCode: agent.agentCode,
                fullName: agent.fullName,
                role: agent.role,
                password: agent.password
            }
        };
    } catch (error) {
        return error.message;
    }
}

export async function serviceAllAgents() {
    try {
        const agents = collection.find({})
        return agents
    } catch (error) {
        return error.message
    }
}