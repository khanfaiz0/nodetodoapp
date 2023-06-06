import ErrorHandler from "../middlewares/errorMiddleware.js";
import  { Task }  from "../models/task.js";

export const newtask = async (req, res, next) => {
    try {
        const {title , description } = req.body;

        await Task.create({
        title, description , user: req.user,
        })

        res.status(201).json({
        success: true,
        message:"task added successfully"
        })
    } catch (error) {
        next(error)
    }
};

export const myTasks = async (req, res) => {
    try {
        const userid = req.user._id;

    const tasks = await Task.find({user: userid});

    res.status(201).json({
        success: true,
        tasks
    })
    } catch (error) {
        next(error)
    }
}

export const updateTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
    if(!task) return next(new ErrorHandler("invalid id",404))

    task.isCompleted = !(task.isCompleted);

    await task.save();

    res.status(200).json({
        success: true,
        task,
        message:"updated"
    })
    } catch (error) {
        next(error)   
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        
        const task = await Task.findById(req.params.id);
        if(!task) return next(new ErrorHandler());
    
        await task.deleteOne();

    res.status(200).json({
        success: true,
        message:"deleted"
    })
    } catch (error) {
        next(error)
    }
}