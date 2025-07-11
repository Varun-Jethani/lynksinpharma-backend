import CareerModel from "../models/career.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/apiresponse.js";
import { ApiError } from "../utils/ApiError.js";


const getCareers = asyncHandler(async (req, res) => {
    const careers = await CareerModel.find();
    if (!careers || careers.length === 0) {
        throw new ApiError(404, "No careers found");
    }
    res.status(200).json(new ApiResponse(200, careers, "Careers fetched successfully"));
});

const postCareer = asyncHandler(async (req, res) => {
    const { title, overview, location, degree, experience, skills, responsibilities } = req.body;

    if (!title || !overview || !location || !degree || !experience || !skills || !responsibilities) {
        throw new ApiError(400, "All fields are required");
    }

    //validate skills and responsibilities as arrays
    if (!Array.isArray(skills) || !Array.isArray(responsibilities)) {
        throw new ApiError(400, "Skills and Responsibilities must be arrays");
    }
    if (skills.length === 0 || responsibilities.length === 0) {
        throw new ApiError(400, "Skills and Responsibilities cannot be empty");
    }



    const newCareer = await CareerModel.create({
        title,
        overview,
        location,
        degree,
        experience,
        skills,
        responsibilities
    });

    if (!newCareer) {
        throw new ApiError(500, "Failed to create career");
    }

    res.status(201).json(new ApiResponse(201, "Career created successfully", newCareer));
});

const updateCareer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, overview, location, degree, experience, skills, responsibilities } = req.body;

    if (!title || !overview || !location || !degree || !experience || !skills || !responsibilities) {
        throw new ApiError(400, "All fields are required");
    }

    //validate skills and responsibilities as arrays
    if (!Array.isArray(skills) || !Array.isArray(responsibilities)) {
        throw new ApiError(400, "Skills and Responsibilities must be arrays");
    }
    if (skills.length === 0 || responsibilities.length === 0) {
        throw new ApiError(400, "Skills and Responsibilities cannot be empty");
    }


    const updatedCareer = await CareerModel.findByIdAndUpdate(id, {
        title,
        overview,
        location,
        degree,
        experience,
        skills,
        responsibilities
    }, { new: true });

    if (!updatedCareer) {
        throw new ApiError(404, "Career not found");
    }

    res.status(200).json(new ApiResponse(200, updatedCareer, "Career updated successfully"));
});

const deleteCareer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedCareer = await CareerModel.findByIdAndDelete(id);
    if (!deletedCareer) {
        throw new ApiError(404, "Career not found");
    }
    res.status(200).json(new ApiResponse(200, "Career deleted successfully"));
});


export {
    getCareers,
    postCareer,
    updateCareer,
    deleteCareer
};
