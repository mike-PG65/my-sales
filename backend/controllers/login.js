import { promisedb } from "../config/db.js";
import express from 'express'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())

export const loginUser= async (req, res)=>{
    const {username, password} = req.body


    console.log(`User ${username} wants to be logged in`)

    const user= `SELECT * FROM usersss WHERE username = ?`
    const value=[username]

    try {
        const [existingUser] = await promisedb.query(user, value)

        if (existingUser.length == 0){
            return res.status(401).json({message:"Invalid username or password!!!"})
        }

        const isMatch = await bcrypt.compare(password, existingUser[0].password);

        if(!isMatch){
            return res.status(401).json({message:"invalid username or password!!!"});

        }

        return res.status(200).json({message: "Login Succesfull"})

    
    } catch (error) {
        console.error("Login Error", error);
        return  res.status(500).json({message: "Something went Wrong"})
        
    }
}