import mongoose from "mongoose";

const CoursesSchema = new mongoose.Schema ({
    title : {
        type: String,
        trim: true,
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
        enum: ['beginner', 'intermediate', 'advanceed']
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

export const coursesSchema = mongoose.model('Courses', CoursesSchema);