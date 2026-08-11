import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Sends/receives the httpOnly admin JWT cookie on cross-origin requests.
  withCredentials: true,
});

export const submitApplication = (payload) => api.post("/applications", payload);

export const submitContactMessage = (payload) => api.post("/contact", payload);

// Public announcements (Home page)
export const getActiveAnnouncements = () => api.get("/announcements/active");

// Admin auth
export const adminLogin = (payload) => api.post("/auth/login", payload);
export const adminLogout = () => api.post("/auth/logout");
export const getAdminSession = () => api.get("/auth/me");

// Admin: applications
export const getAdminApplicationStats = () => api.get("/admin/applications/stats");
export const getAdminApplications = (params) => api.get("/admin/applications", { params });
export const getAdminApplicationById = (id) => api.get(`/admin/applications/${id}`);
export const updateAdminApplicationStatus = (id, status) =>
  api.patch(`/admin/applications/${id}/status`, { status });
export const addAdminApplicationNote = (id, text) =>
  api.post(`/admin/applications/${id}/notes`, { text });
export const deleteAdminApplication = (id) => api.delete(`/admin/applications/${id}`);

// Admin: announcements
export const getAdminAnnouncements = () => api.get("/admin/announcements");
export const createAdminAnnouncement = (payload) => api.post("/admin/announcements", payload);
export const updateAdminAnnouncement = (id, payload) =>
  api.put(`/admin/announcements/${id}`, payload);
export const toggleAdminAnnouncementActive = (id) =>
  api.patch(`/admin/announcements/${id}/toggle`);
export const deleteAdminAnnouncement = (id) => api.delete(`/admin/announcements/${id}`);

export default api;
export const updateAdminApplicationFeesStatus = (id, feesStatus) =>
  api.patch(`/admin/applications/${id}/fees-status`, { feesStatus });