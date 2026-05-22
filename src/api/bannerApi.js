// api/bannerApi.js

import axiosInstance from "./axiosInstance.js";

// ===============================
// CREATE BANNER API
// ===============================

export const createBannerApi = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "/banner/create-banner",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ===============================
// GET ALL BANNERS API
// ===============================

export const getAllBannerApi = async () => {
  try {
    const { data } = await axiosInstance.get("/banner/get-all-banner");

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ===============================
// DELETE BANNER API
// ===============================

export const deleteBannerApi = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/banner/delete-banner/${id}`);

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
