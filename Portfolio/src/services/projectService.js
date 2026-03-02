import axiosInstance from "./axiosInstance";

export const getProjects = async () => {
  const response = await axiosInstance.get("/projects");
  return response.data.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await axiosInstance.get(`/projects/${slug}`);
  return response.data.data;
};