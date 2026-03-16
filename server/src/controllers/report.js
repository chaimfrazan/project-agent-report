import { parse } from 'csv-parse/sync';
import { serviceCreateReport, createReportsFromCsv, serviceGetReports, serviceGetReport } from '../services/report.js'


export async function createReport(req, res) {
    try {
        const { category, urgency, message } = req.body
        const user = req.user
        console.log(user)
        if (!category || !urgency || !message) {
            res.status(400).json({
                sucess: false,
                message: "missing some of things",
            })
        }
        const imagePath = req.file ? req.file.path : null;
        const report = await serviceCreateReport(urgency, category, message, imagePath, user.agentCode)
        if (report) {
            res.status(201).json({
                sucess: true,
                report: report,
                message: 'created successfuly'
            })
        }
    } catch (error) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })
    }
}

export async function importCsv(req, res) {
    try {

        if (!req.files || !req.files.csvFile) {
            return res.status(400).json({ error: "not found any file" });
        }

        const csvContent = req.files.csvFile.data.toString("utf8");
        const records = parse(csvContent, { columns: true, skip_empty_lines: true });


        const result = await createReportsFromCsv(req.user.agentCode, records);
        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getReports(req, res) {
    try {
        const { agentCode, category, urgency } = req.query
        const user = req.user

        let filter = {}
        if (user.role === 'admin') {
            if (agentCode) filter.agentCode = agentCode;
            if (category) filter.category = category;
            if (urgency) filter.urgency = urgency;
        }
        else {
            filter.agentCode = user.agentCode;
        }
        const filtered = await serviceGetReports(filter)
        res.status(200).json({ filtered })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getReport(req, res) {
    try {
        const { id } = req.params
        const user = req.user
        const res = await serviceGetReport(id)
        res.status(200).json(res)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}