import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects } from "../../services/projectService";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      return await getProjects();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);