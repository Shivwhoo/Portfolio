import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import Project from "../models/project.model.js";

// GET all projects
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  return res.status(201).json(new ApiResponse(201,projects,"All projects fetched successfully"))
});

// GET single project by slug
export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });

  if (!project) {
    throw new ApiError(404,"Project not found");
  }

  res.status(200).json(new ApiResponse(200,project,"Project fetched successfully"));
});