import React, { useState } from 'react';
import { createReport } from '../../api/axios';
import { AxiosError } from 'axios';

function Report() {
  const [report, setReport] = useState({
    category: '',
    urgency: '',
    message: '',
  });
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const submit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const res = await createReport(report);
      console.log(res)
      setStatus("success");
      setMessage(res.data.message)

      setReport({
        category: "",
        urgency: "",
        message: "",
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
    <div className="main-form-admin-users">
      <div className="form-admin-users">
        <h3>create report</h3>
        <form onSubmit={submit}>
          <label className="label">urgency</label>
          <select
            className="select-create-agent"
            value={report.urgency}
            onChange={(e) =>
              setReport((prev) => ({ ...prev, urgency: e.target.value }))
            }
          >
            <option value="">select urgency</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <label className="label">category</label>
          <select
            className="select-create-agent"
            value={report.category}
            onChange={(e) =>
              setReport((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="">select category</option>
            <option value="intelligence">intelligence</option>
            <option value="logistics">logistics</option>
            <option value="alert">alert</option>
          </select>

          <label className="label">message</label>
          <textarea
            className="input"
            required
            value={report.message}
            onChange={(e) =>
              setReport((prev) => ({ ...prev, message: e.target.value }))
            }
          />

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
  );
}

export default Report;
