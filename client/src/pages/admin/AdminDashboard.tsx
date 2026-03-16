import AdminNavbar from "../../components/AdminNavbar"
import { useNavigate } from "react-router";

function AdminDashboard() {
  const navigate = useNavigate();


  return (
    <div>
      <AdminNavbar />
      <div className="home-admin">
        <div className="button-nav" onClick={() => navigate("/admin/users")}>
          <p>to introduce and create agent👨‍💼</p>
        </div>
        <div className="button-nav" onClick={() => navigate("/admin/reports")}>
          <p>to search and filter reports 📃</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
