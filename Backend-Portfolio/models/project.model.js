import { timeStamp } from 'console'
import express from 'express'
import mongoose from 'mongoose'
import Schema from 'mongoose'

const projectSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    longDescription:{
        type:String,
        required:true,
    },
    tech:{
        type:String,
        required:true,
    },
    github:{
        type:String,
        required:true,
    },
    live:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    featured:{
        
    }
},{timeStamps:true})


const projects=mongoose.model("Projects",projectSchema)
export default projects