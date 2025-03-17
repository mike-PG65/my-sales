import bcrypt from 'bcrypt'
import { promisedb } from '../config/db.js'


export const registerUser = async (req, res)=>{
    const {name, email, username, password, confirmPassword} = req.body

    if (!name || !email || !username || !password || !confirmPassword){
        console.log("All fields are required")
        return res.status(400).json({message:"All fields are required"})
    }

    if (password !== confirmPassword){
        return res.status(400).json({message:"Passwords do not match!!!"})
    }

    const check = 'SELECT * FROM usersss WHERE email =? '
    const value = [email]

    try {
        const [existingUser] = await promisedb.query(check, value);
        
        if (existingUser.length > 0) {
            console.log("User already exists")
            return res.status(400).json({message:"User already exists"})
        }

        const saltrounds =10;
        const hashedPassword =await bcrypt.hash(password, saltrounds)


        const insert = `INSERT INTO usersss (name, email, username, password) VALUES(?,?,?,?)`
        const values = [name, email, username, hashedPassword]


        const [rows] = await promisedb.query(insert, values);

        console.log(`${name} you have registered sucessfully`)

        return res.status(200).json({message:`${username} you have registered sucessfully`})

        
    } catch (error) {

        console.error("Error adding the user to the database!!", error);
        return res.status(500).json({message:"Failed to add user!!"})
        
    }
}


export const userProfile= async(req, res)=>{

    const [id] = req.params.id;

    const user = `SELECT * FROM usersss WHERE id = ?`
    const userid = [id]

    try {


        const [rows] = await promisedb.query(user, userid);
        
        if (rows.length == 0){
            console.log("User does not exist!!")

            return res.status(404).json({message:"User does not exist!!"})
        }

        
    } catch (error) {

        console.error("Error retreving the user!!", error)
        return res.status(500).json({message: " Internal server error!!"})
        
    }
};







