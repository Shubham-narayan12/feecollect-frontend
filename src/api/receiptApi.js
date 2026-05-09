import axiosInstance from "./axiosInstance.js";

export const generateFeeReceipt = (formData) => {
  return axiosInstance.post("/receipt/recipt-collect-fee", formData);
};

export const downloadReceiptPdf = async (fileName) => {
  const response = await axiosInstance.get(`/receipt/download/${fileName}`, {
    responseType: "blob", // 🔥 THIS IS THE KEY
  });

  // Create blob URL
  const blob = new Blob([response.data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  // Create hidden link & click
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();

  // Cleanup
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const searchRecipt = (formData) => {
  return axiosInstance.post("/receipt/search-recipt", formData);
};
