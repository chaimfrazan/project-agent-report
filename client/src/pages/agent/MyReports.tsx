import { useEffect, useState } from "react";
import { getReports } from "../../api/axios";

function MyReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await getReports();
        setReports(res.data.filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) return <p>loading...</p>;

  return (
    <>
      <h2>my reports</h2>
      <div className="admin-reports-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>agentCode</th>
              <th>urgency</th>
              <th>category</th>
              <th>message</th>
              <th>imagePath</th>
              <th>sourceType</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.agentCode}</td>
                <td className={`urgency-${report.urgency}`}>{report.urgency}</td>
                <td>{report.category}</td>
                <td>{report.message}</td>
                <td> {report.imagePath} </td>
                <td>{report.sourceType}</td>
                <td>{report.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reports.length === 0 && <p>not found reports</p>}
      </div>
    </>
  );
}

export default MyReports;
