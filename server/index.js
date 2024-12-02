import express from "express"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/auth.route.js"
import {connectDb} from "./lib/db.js"

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
    connectDb()
})
