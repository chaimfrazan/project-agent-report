import { useState } from "react";
import { csvReport } from "../../api/axios";

function CsvReport() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("אנא בחר קובץ קודם");

    // יצירת FormData - זה קריטי להעלאת קבצים
    const formData = new FormData();
    // השם 'csvFile' חייב להיות זהה למה שהשרת מצפה לו (req.files.csvFile)
    formData.append("csvFile", file);

    try {
      const response = await csvReport(formData)

      setMessage("הקובץ הועלה בהצלחה!");
      console.log(response.data);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "שגיאה בהעלאה");
    }
  };

  return (
    <div className="csv-uploader">
      <h3>העלאת דיווחים מקובץ CSV</h3>
      <form onSubmit={handleUpload}>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange} 
        />
        <button type="submit" disabled={!file}>שלח קובץ</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CsvReport;
