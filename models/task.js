import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        required:true,
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        Ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }

})

export const Task = mongoose.model("Task", schema);


