import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUserForSidebar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers  = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in siderbar controller", error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}


//get message

export const getMessage = async(req,res) =>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                { senderId:myId,receiverId:userToChatId },
                {senderId:userToChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}

export const sendMessage = async(req,res) =>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageURL;

        if(image){
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageURL = uploadresponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        })

        await newMessage.save();

        res.status(200).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({message:"Internal Server error"})
    }
}