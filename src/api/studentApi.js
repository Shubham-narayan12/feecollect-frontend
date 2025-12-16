import axiosInstance from "./axiosInstance.js";

export const createStudent = async (formData) => {
  return axiosInstance.post("/student/create", formData);
};

export const bulkApply = async (formData) => {
  return axiosInstance.post("/student/bulk-apply", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const searchStudent = async (formData) => {
  return axiosInstance.post("/student/search", formData);
};

export const searchStudentById = async (id) => {
  return axiosInstance.get(`/student/${id}`);
};

export const getAllStudent = async () => {
  return axiosInstance.get("/student/all");
};

export const editStudent = async (id, formData) => {
  return axiosInstance.put(`/student/${id}`, formData);
};

export const deleteStudent = async (id) => {
  return axiosInstance.delete(`/student/${id}`);
};
