import mysql, { createConnection } from 'mysql2'
import dotenv from 'dotenv' 
import mongoose from 'mongoose'
dotenv.config();


const db =createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_BASE
 
 });
 
 export 
 const promisedb = db.promise();
 
 db.connect ((err)=>{
     if (err){
         console.log("Error connecting to the database!!", err)
         return;
     }
     console.log("Connected to the database");
 });



// config/db.js;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Connected to Database: ${conn.connection.name}`)
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

