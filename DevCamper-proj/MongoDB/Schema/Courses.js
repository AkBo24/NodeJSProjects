import { mongoose } from "mongoose";

export const coursesSchema = new mongoose.Schema ({
    title : {
        type: String,
        required: [true, 'Enter a course title']
    },
    description : {
        type: String,
        required: [true, 'Enter a course description']
    },
    weeks :  {
        type: String,
        required: [true, 'Enter duration of the course in weeks']
    },
    tuition: {
        type: Number,
        required: [true, 'Enter course tuition']
    },

    minimumSkill: {
        type: String,
        required: [true, 'Enter course minimum skill level'],
        enum: ['beginner', 'intermdiate', 'advanceed']
    },
    scholarhipsAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: String,
        ref: 'BootcampSchema',
        required: [true, 'Enter course\'s bootcamp']
    },

});