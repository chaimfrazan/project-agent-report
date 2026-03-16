import { useEffect, useState } from "react";
import { createAgent, getUsers } from "../../api/axios";
import { AxiosError } from "axios";


function AdminUsers() {
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [user, setUser] = useState({
    agentCode: "",
    password: "",
    fullName: "",
    role: ""
  });

  async function submit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const res = await createAgent(user);
      console.log(res)
      setStatus("success");
      setMessage(res.data.message)

      setUser({
        agentCode: "",
        password: "",
        fullName: "",
        role: ""
      });

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage(error.message);
        }
      } else {
        setMessage("error");
      }
      setStatus("error");
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await getUsers();
        setUsers(res.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="main-form-admin-users">
        <div className="form-admin-users">
          <h3>create agent</h3>
          <form onSubmit={submit}>
            <label className="label">agent code</label>
            <input
              className="input"
              type="text"
              required
              value={user.agentCode}
              onChange={(e) =>
                setUser((user) => ({ ...user, agentCode: e.target.value }))
              }
            />

            <label className="label">password</label>
            <input
              className="input"
              type="password"
              required
              value={user.password}
              onChange={(e) =>
                setUser((user) => ({ ...user, password: e.target.value }))
              }
            />

            <label className="label">full name</label>
            <input
              className="input"
              type="text"
              required
              value={user.fullName}
              onChange={(e) =>
                setUser((user) => ({ ...user, fullName: e.target.value }))
              }
            />

            <label className="label">role</label>
            <select
              className="select-create-agent"
              value={user.role}
              onChange={(e) =>
                setUser((user) => ({ ...user, role: e.target.value }))
              }
            >
              <option value="">select role</option>
              <option value="agent">agent</option>
              <option value="admin">admin</option>
            </select>

            <button className="submit-create-agent" type="submit">
              create
            </button>

            {message && (
              <p className={status === "success" ? "msg-success" : "msg-error"}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="home-table">
        <div className="table">
          <h3>all agents</h3>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>agent Code</th>
                <th>password</th>
                <th>full Name</th>
                <th>role</th>
                <th>created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u._id}</td>
                  <td>{u.agentCode}</td>
                  <td>{u.password}</td>
                  <td>{u.fullName}</td>
                  <td>{u.role}</td>
                  <td>{u.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;