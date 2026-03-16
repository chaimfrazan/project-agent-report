import { useState } from "react";
import { login } from '../api/axios.ts'
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import useUserContext from "../contextProvider/userContext.tsx";

function Login() {
  const { setUser, loading } = useUserContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    agentCode: "",
    password: "",
  });

  async function submit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      const res = await login(form);

      const user = res.data.user;
      const token = res.data.token;

      setUser(user);
      localStorage.setItem("token", token);

      setStatus("success");
      setMessage(`welcome ${user.role} ${user.fullName}`);

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/home");
        } else {
          navigate("/agent/home");
        }
      }, 1500);

      setForm({
        agentCode: "",
        password: "",
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

  return (
    <div>
      <div className="navbar-login">
        <h3>welcome to system reports for agent</h3>
      </div>
      <div className="main-form">
        <div className="form">
          <form onSubmit={submit}>
            <label className="label">agent code</label>
            <input
              className="input"
              type="text"
              required
              value={form.agentCode}
              onChange={(e) => {
                setForm((form) => ({ ...form, agentCode: e.target.value }));
              }}
            />

            <label className="label">password</label>
            <input
              className="input"
              type="password"
              required
              value={form.password}
              onChange={(e) => {
                setForm((form) => ({ ...form, password: e.target.value }));
              }}
            />

            <button className="submit" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {message && (
              <p
                className=
                {status === "success" ? "msg-success" : "msg-error"}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
