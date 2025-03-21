import Category from "../models/Category.js";

export const createCategory = async(req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        await newCategory.save();
        if(!newCategory){
            res.status(400).json({message:"Something went wrong"});
        }

        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
}

export const getAllCategories = async(req, res) =>{
    try {
        const categories = await Category.find();

        res.json(categories).status(200);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message});
    }
}