import express from "express";
import mongoose, { Schema } from "mongoose";

const contactSchema=new Schema ({
    name:{
        type:String,
        required :true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})
const contact= mongoose.model("Contact",contactSchema);
export default contact