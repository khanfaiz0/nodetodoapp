import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import  cors from "cors"

export const app = express();

config({
    path: "./data/config.env",
})

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "PUT" , "POST" , "DELETE"],
    Credential: true,
}));


app.use("/user",userRouter);
app.use("/task",taskRouter);


app.get("/",(req, res)=>{
    
    res.send("hello")
})


app.use(errorMiddleware);