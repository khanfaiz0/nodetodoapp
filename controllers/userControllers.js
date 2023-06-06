import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";
import  jwt  from "jsonwebtoken";



export async function getall(req, res , next) {

    try {
        const users = await User.find({});

    res.json(
        {
            success: true,
            users
        }
    );
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} =req.body;

    const user = await User.findOne({email}).select("+password")

    if(!user) return  next(new ErrorHandler("invalid user or password.",400))
    
    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch) return next(new ErrorHandler("invalid user or password",400))

    sendCookie(user,`you are loged in  ${user.name}`, 201 ,res);
    
    } catch (error) {
        next(error)
    }

}

export const register = async (req, res) => {
    try {
        const {name , email , password } = req.body;

    let user = await User.findOne({ email });

    if(user) return  next(new ErrorHandler("user already exists.",404))

    const hashedPassword = await bcrypt.hash(password,10)

    user = await User.create({name , email , password:hashedPassword});

    sendCookie(user,"registered", 201 ,res);

    } catch (error) {
        next(error)
    }
} 


export const myProfile =  async (req, res) => {
        res.json(
            {
                success: true,
                user: req.user
            }
        )
};

export const logout = (req, res) =>{
    res.status(201).cookie("token","",{
        expires : new Date(Date.now()),
        sameSite:process.env.NODE_ENV == "Development"? "lax" : "none",
        secure:process.env.NODE_ENV == "Development"? false : true,
    }).json(
        {
            success: true,
            message:"cookie removed"
        }
    )

}

// export const userDelt =  async (req, res) => {
//     const {id} = req.params
    
//         const users = await User.findById(id)
    
//         res.json(
//             {
//                 success: true,
//                 users,
//                 message:"user deleted"
//             }
//         )
// };

// export const userUpdate =  async (req, res) => {
//     const {id} = req.params
    
//         const users = await User.findById(id)
    
//         res.json(
//             {
//                 success: true,
//                 message:"updated"
//             }
//         )
// };



//code for create user
// const {name , email , password} = req.body
    
//     await User.create({
//         name,
//         email,
//         password,
//     })
    
//     res.status(201).json(
//         {
//             success: true,
//             message: "success post data"
//         }
//         )