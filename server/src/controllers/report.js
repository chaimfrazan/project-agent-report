import { parse } from 'csv-parse/sync';
import { serviceCreateReporte, createReportsFromCsv } from '../services/report.js'


export async function createReport(req, res) {
    try {
        const { category, urgency, message, user } = req.body
        if (!category || !urgency || !message) {
            res.status(400).json({
                sucess: false,
                message: "missing some of things",
            })
        }
        const report = await serviceCreateReporte(category, urgency, message, user.id)
        if (report) {
            res.status(201).json({
                sucess: true,
                report: report,
                message: 'created'
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
            return res.status(400).json({ error: "לא נמצא קובץ CSV להעלאה" });
        }
        const csvFile = req.files.csvFile;

        if (csvFile.mimetype !== "text/csv" && !csvFile.name.endsWith(".csv")) {
            return res.status(400).json({ error: "סיומת קובץ לא חוקית. נדרש CSV" });
        }
        const csvContent = csvFile.data.toString("utf8");

        let records;
        try {
            records = parse(csvContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true,
            });
        } catch (parseError) {
            return res.status(400).json({ error: "פורמט ה-CSV לא תקין" });
        }

        if (!records || records.length === 0) {
            return res.status(400).json({ error: "קובץ ה-CSV ריק" });
        }
        const result = await createReportsFromCsv(req.user.id, records);
        
        if (result.error) {
            return res.status(result.status || 400).json({ error: result.error });
        }
        return res.status(201).json(result);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}