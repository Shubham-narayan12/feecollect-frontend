// api/galleryApi.js

import axiosInstance from "./axiosInstance.js";

// ==========================================
// CREATE GALLERY
// ==========================================

export const createGalleryApi = async (formData) => {
  try {
    const { data } = await axiosInstance.post(
      "/gallery/create-gallery",
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

// ==========================================
// GET ALL GALLERY
// ==========================================

export const getAllGalleryApi = async () => {
  try {
    const { data } = await axiosInstance.get("/gallery/get-all-galleryImages");

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==========================================
// GET SINGLE GALLERY
// ==========================================

export const getSingleGalleryApi = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/gallery/get-single-galleryImage/${id}`,
    );

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ==========================================
// UPDATE GALLERY
// ==========================================

export const updateGalleryApi = async (id, formData) => {
  try {
    const { data } = await axiosInstance.put(
      `/gallery/update-galleryImage/${id}`,
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

// ==========================================
// DELETE GALLERY
// ==========================================

export const deleteGalleryApi = async (id) => {
  try {
    const { data } = await axiosInstance.delete(
      `/gallery/delete-galleryImage/${id}`,
    );

    return data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
