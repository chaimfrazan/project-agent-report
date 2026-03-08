import { getDb } from "../db/connect-mongo.js";
import dotenv from "dotenv";

dotenv.config();
const db = await getDb();
const collection = await db.collection("reports");


export async function serviceCreateReporte(category, urgency, message, id) {
    await collection.insertOne({
        userId: id,
        category: category,
        urgency: urgency,
        message: message,
        createdAt: new Date(),
    });
    const report = await collection.findOne({ message });
    return {
        success: true,
        report: report
    }
}

export async function createReportsFromCsv(id, records) {
    try {
        const reportsToSave = records.map(record => ({
            ...record,
            userId: id,
            createdAt: new Date()
        }));

        const result = await collection.insertMany(reportsToSave);
        return {
            success: true,
            importedCount: result.insertedCount,
            reports: reportsToSave.map((report, index) => ({
                _id: result.insertedIds[index],
                ...report
            }))
        };
    } catch (error) {
        return error.message
    }
}
