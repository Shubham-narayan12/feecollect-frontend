import axiosInstance from "./axiosInstance.js";

export const generateFeeReceipt = (formData) => {
  return axiosInstance.post("/receipt/receipt-fee-collect", formData);
};

export const downloadReceiptPdf = (fileName) => {
  return axiosInstance.get(`/receipt/download/${fileName}`);
};
