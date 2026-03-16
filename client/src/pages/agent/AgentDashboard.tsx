import AgentNavbar from "../../components/AgentNavbar";
import { useNavigate } from "react-router";

function AgentDashboard() {
  const navigate = useNavigate();


  return (
    <div>
      <AgentNavbar />
      <div className="home-agent">
        <div className="button-nav" onClick={() => navigate("/agent/create/csvReport")}>
          <p>to load csv reports 📃</p>
        </div>
        <div className="button-nav" onClick={() => navigate("/agent/create/report")}>
          <p>to create form report 📃</p>
        </div>
        <div className="button-nav" onClick={() => navigate("/agent/myReports")}>
          <p>all my reports 📃</p>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
