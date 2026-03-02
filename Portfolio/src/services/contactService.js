import axiosInstance from "./axiosInstance";

export const sendContactMessage = async (data) => {
  const response = await axiosInstance.post("/contact", data);
  return response.data.data;
};