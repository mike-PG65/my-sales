import express from 'express'
import { promisedb } from '../config/db.js'
import bcrypt from 'bcrypt'


export const usersadd =async (req, res)=>{
    const {name, email, username, password ,confirmPassword} = req.body

    console.log(`${username} wants to be added as a user`)

    if (!name || !email || !username  || !password || !confirmPassword){
        return res.status(400).json( {message:"All fields are required"})
        }

        if (password !== confirmPassword){
           return res.status(400).json( {message:"Passwords do not match"})
            }

    

    const check = ` SELECT * FROM usersss WHERE email = ?`
    const value = [email]

    try {

        const [results] = await promisedb.query(check, value)

        if (results.length > 0){
            console.log("User already exists")
            return res.status(400).json({message: " User already exists!!!"})
        }

    const saltrounds=10
    const hashedPassword = await bcrypt.hash(password, saltrounds)

    const insert = `INSERT INTO usersss (name, email, username, password) VALUES(?,?,?,?)`
    const values = [name, email, username, hashedPassword]

    const [user] = await promisedb.query(insert, values)

    return res.status(200).json({message : `${username} created sucessfully`})


  


        
    } catch (error) {
        console.error(`Failed to add user ${username}`, error)
        return res.status(500).json({message: `Failed to add user ${username}`})
        
    } }

    

 
 export const users = async (req, res)=>{
    const check = `SELECT * FROM usersss`;
    // const values = [name, email, username]

    try {

        const [results] = await promisedb.query(check)

        if (results.length === 0) {
            // If there are no results, return a message
            return res.status(404).json({ message: "No users found." });
        }

        res.json(results)
        
    } catch (error) {
        
            console.error('Error fetching data from the database:', error);
              res.status(500).json({ error: 'Error fetching data' });
              return;        
        
}
} 

export const getuserbyid = async(req, res)=>{
    const {id} = req.params;

    const check = `SELECT * FROM usersss WHERE id = ?`
    const value = [id]

    try {
        const [results] = await promisedb.query(check, value);

    if (results.length == 0){
        return res.status(400).json({message: "User not found"})
    }

    return res.status(200).json(results[0]);
        
    } catch (error) {
        console.error(`Cannot get user by id ${id}`, error)
        res.status(500).json({message: `Cannot get user by id ${id}`})
        
    }


}

export const updateUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from the request parameters
    const { name, email, username, password, confirmPassword } = req.body; // Extract updated data from the request body

    try {
        // Check if the ID exists in the request
        if (!id) {
            return res.status(400).json({ message: "ID parameter is required" });
        }

        // Validate required fields
        if (!name || !email || !username || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if the user exists
        const checkUserQuery = `SELECT * FROM usersss WHERE id = ?`;
        const [userResults] = await promisedb.query(checkUserQuery, [id]);

        if (userResults.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user with the new values
        const updateQuery = `UPDATE usersss SET name = ?, email = ?, username = ?, password = ? WHERE id = ?`;
        const values = [name, email, username, hashedPassword, id];

        console.log(`${username} wants to be updated`)

        await promisedb.query(updateQuery, values);

        // Send success response
        return res.status(200).json({ message: `User ${username} updated successfully` });

    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        return res.status(500).json({ message: "Failed to update user" });
    }
};
