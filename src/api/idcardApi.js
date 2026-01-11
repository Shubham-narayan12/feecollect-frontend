import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const uploadZipFile = (zipFile, batch) => {
  const formData = new FormData();

  formData.append("zip", zipFile); // 👈 multer ka field name
  formData.append("batch", batch); // 👈 optional but bhejna better hai

  return axiosInstance.post("/idcard/parent-photos/upload-zip", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const generateIdCard = (formData) => {
  return axiosInstance.post("/idcard/generate/bulk", formData);
};

export const downloadIdcard = (fileName) => {
  return axiosInstance.get(`/idcard/download/${fileName}`, {
    responseType: "blob", // 👈 VERY IMPORTANT
  });
};
