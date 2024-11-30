import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const protectRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized -- no tokes provided"})
        }
        // console.log(token);


        const decode = jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({message:"Unauthorized -- invalid token"})
        }

        const user = await User.findById(decode.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"user not found"})
        }

        req.user = user;
         next()
            
    } catch (error) {
       console.log("Error in protected route middlewares",error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}