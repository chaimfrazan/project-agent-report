import { useEffect, useState } from "react";
import { getReports } from "../../api/axios";

function AdminReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterUrgency, setFilterUrgency] = useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await getReports();
        console.log(res.data.filtered[0])
        setReports(res.data.filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.agentCode?.includes(searchTerm)

    const matchesCategory = filterCategory === "" || report.category === filterCategory;
    const matchesUrgency = filterUrgency === "" || report.urgency === filterUrgency;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  if (loading) return <p>loading...</p>;

  return (
    <>
      <h2>reports</h2>
      <div className="admin-reports-container">
        <div className="filters-bar" >
          <input
            className="input-report"
            type="text"
            placeholder="saerch report by agentCode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select className="input-report" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">all the cetogory</option>
            <option value="intelligence">intelligence</option>
            <option value="logistics">logistics</option>
            <option value="alert">alert</option>
          </select>

          <select className="input-report" value={filterUrgency} onChange={(e) => setFilterUrgency(e.target.value)}>
            <option value="">all the urgency</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </div>

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
            {filteredReports.map((report) => (
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

        {filteredReports.length === 0 && <p>not found reports</p>}
      </div>

    </>
  );
}

export default AdminReports;
