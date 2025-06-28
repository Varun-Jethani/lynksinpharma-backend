import mongoose from "mongoose";

const whatWeDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1000,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
});

const WhatWeDoModel = mongoose.model("WhatWeDo", whatWeDoSchema);

export default WhatWeDoModel;  