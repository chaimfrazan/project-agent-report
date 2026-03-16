import { getDb } from "../db/connect-mongo.js";
import dotenv from "dotenv";
import { ObjectId } from 'mongodb';

dotenv.config();
const db = await getDb();
const collection = await db.collection("reports");


export async function serviceCreateReport(urgency, category, message, imagePath, agentCode) {
    await collection.insertOne({
        agentCode: agentCode,
        urgency: urgency,
        category: category,
        message: message,
        imagePath: imagePath,
        sourceType: 'form',
        createdAt: new Date(),
    });
    const res = await collection.findOne({ message });
    return {
        success: true,
        report: res
    }
}

export async function createReportsFromCsv(agentCode, records) {
    const reportsToSave = records.map(record => ({
        agentCode: agentCode,
        ...record,
        sourceType: 'csv',
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

}

export async function serviceGetReports(filter) {
    const reports = await collection.find(filter).toArray()
    return reports
}

export async function serviceGetReport(id) {
    const report = await collection.findOne({ _id: new ObjectId(id) });
    return report
}

