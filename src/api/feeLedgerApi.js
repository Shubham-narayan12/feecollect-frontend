import axiosInstance from "./axiosInstance.js";

export const getFeeLedgerByStudentId = async (id) => {
  return axiosInstance.get(`/feecollect/${id}`);
};

export const feecollect = async(data)=>{
  return axiosInstance.post("/feecollect/collect-fee",data)
}
