import axiosInstance from "./axiosInstance.js";

/**
 * ✅ Create Admin
 * @param {Object} formData
 */
export const createAdmin = async (formData) => {
  return axiosInstance.post("/admin/create", formData);
};

/**
 * ✅ Login Admin
 * @param {Object} credentials { email, password }
 */
export const loginAdmin = async (credentials) => {
  return axiosInstance.post("/admin/login", credentials);
};

/**
 * ✅ Edit Admin
 * @param {String} adminId
 * @param {Object} updatedData
 */
export const editAdmin = async (adminId, updatedData) => {
  return axiosInstance.put(`/admin/${adminId}`, updatedData);
};

/**
 * ✅ Delete (Deactivate) Admin
 * @param {String} adminId
 */
export const deleteAdmin = async (adminId) => {
  return axiosInstance.delete(`/admin/${adminId}`);
};

/**
 * ✅ Logout Admin
 */
export const logoutAdmin = async () => {
  return axiosInstance.post("/admin/logout");
};

export const getMeApi = async () => {
  return await axiosInstance("/admin/get-me", {
    withCredentials: true,
  });
};
