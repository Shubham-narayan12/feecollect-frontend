import axiosInstance from "./axiosInstance.js";

export const getFeeLedgerByStudentId = async (id) => {
  return axiosInstance.get(`/feecollect/${id}`);
};
