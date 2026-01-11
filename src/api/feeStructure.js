import axiosInstance from "./axiosInstance.js";

/* ================= CREATE ================= */
export const createFeeStructure = async (formData) => {
  return axiosInstance.post("/feestructure/create", formData);
};

/* ================= GET BY CLASS ================= */
// backend me POST hai, isliye yaha bhi POST
export const getFeeStructureByClass = async (className) => {
  return axiosInstance.post("/feestructure/get-fee-by-class",className);
};

/* ================= GET ALL ================= */
export const getAllFeeStructures = async () => {
  return axiosInstance.get("/feestructure/get-all-feestructure");
};

/* ================= UPDATE ================= */
export const updateFeeStructure = async (id, updatedData) => {
  return axiosInstance.put(`/feestructure/${id}`, updatedData);
};

/* ================= DELETE ================= */
export const deleteFeeStructure = async (id) => {
  return axiosInstance.delete(`/feestructure/${id}`);
};
