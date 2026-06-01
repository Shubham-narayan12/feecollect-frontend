// ==========================================
// api/noticeApi.js
// ==========================================

import axiosInstance from "./axiosInstance.js";

// ==========================================
// CREATE NOTICE
// ==========================================
export const createNoticeApi = async (data) => {
  return await axiosInstance.post("/notice/create-notice", data);
};

// ==========================================
// GET ALL NOTICE
// ==========================================
export const getAllNoticeApi = async () => {
  return await axiosInstance.get("/notice/get-all-notice");
};

// ==========================================
// GET SINGLE NOTICE
// ==========================================
export const getSingleNoticeApi = async (id) => {
  return await axiosInstance.get(`/notice/get-single-notice/${id}`);
};

// ==========================================
// UPDATE NOTICE
// ==========================================
export const updateNoticeApi = async (id, data) => {
  return await axiosInstance.put(`/notice/update-notice/${id}`, data);
};

// ==========================================
// DELETE NOTICE
// ==========================================
export const deleteNoticeApi = async (id) => {
  return await axiosInstance.delete(`/notice/delete-notice/${id}`);
};

//-------------------------------------------------------------------------------

// ==========================================
// CREATE EVENT
// ==========================================
export const createEventApi = async (data) => {
  return await axiosInstance.post("/event/create-event", data);
};

// ==========================================
// GET ALL EVENT
// ==========================================
export const getAllEventApi = async () => {
  return await axiosInstance.get("/event/get-all-event");
};

// ==========================================
// GET SINGLE EVENT
// ==========================================
export const getSingleEventApi = async (id) => {
  return await axiosInstance.get(`/event/get-single-event/${id}`);
};

// ==========================================
// UPDATE EVENT
// ==========================================
export const updateEventApi = async (id, data) => {
  return await axiosInstance.put(`/event/update-event/${id}`, data);
};

// ==========================================
// DELETE EVENT
// ==========================================
export const deleteEventApi = async (id) => {
  return await axiosInstance.delete(`/event/delete-event/${id}`);
};
