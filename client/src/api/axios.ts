import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001/",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export const login = (data: {}) => api.post("/auth/login", data);
export const createAgent = (data: {}) => api.post("/admin/users", data);
export const getUsers = () => api.get("/admin/users");
export const myProfile = () => api.post("/auth/me");
export const createReport = (data: {}) => api.post("/reports", data);
export const getReports = () => api.get("/reports");
export const csvReport = (formData: any) =>
    api.post("/reports/csv", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const getReportById = (id: string) => api.get(`/reports/${id}`)