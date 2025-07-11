import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    location: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    skills: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    postedDate: { type: Date, default: Date.now },
});

const CareerModel = mongoose.model("Career", careerSchema);

export default CareerModel;
