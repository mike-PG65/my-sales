import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true ,
        lowercase: true,   
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength:[3, 'Username must have atleast 3 characters'],
        maxlength: [30, 'The username cannot exceed 30 characters'],

    },
    email: {
        type:String,
        unique:true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        
    }
}, {timestamps: true})



const User = mongoose.model('User',usersSchema)