import Product from "../models/Products.js";
import mongoose from "mongoose";


export const createProduct = async (req, res)=>{

    const { name, quantity, categoryId, price } = req.body;
    
    // Validate required fields
    if (!name || !quantity || !categoryId || !price) {
      return res.status(400).json({ message: 'All fields!! are reqiured image is optional' });
    }


    try {

        const newProduct = await Product.create(req.body);

        await newProduct.save()

        return res.status(200).json({message:"Product added sucessfully"})
        
    } catch (error) {
        console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error });
        
    }
}



export const getProducts = async(req, res)=>{
    try {

    const products = await Product.find()
    res.status(200).json(products);
        
    } catch (error) {

        console.error
        res.status(500).json({message:error.message})
        
    }

}



export const getProductById = async(req, res) =>{
    const { id } = req.params
    
    try {
        const product = await Product.findById(id)

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
          }

        if (!product){
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product)
        
    } catch (error) {

        console.error('Error fetching product:', error);
        return res.status(500).json({message:"Error fetching Product"})
        
    }
}



export const updateById = async (req, res) =>{
    const { id } = req.params
    const {name, quantity, categoryId, price} = req.body


    try {

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid product ID format' });
          }


          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {name, quantity, categoryId, price},
            {new: true, runValidators: true}
          );

          if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
          }

          res.status(200).json({message:"Product Updated Successfully"})
        
    } catch (error) {


        console.error('Error updating product:', error)
        res.status(500).json({message:"Error updating the product!!", error})
        
    }
}





export const deleteProduct = async (req, res) =>{
    const { id } = req.params

    try {

        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid product ID format"})
        }

        res.status(200).json({message:"Product deleted Successfully!!"})
        
    } catch (error) {

        console.error("Error deleting the product", error)
        res.status(500).json({message:"Error deleting the product!!"})
    }
}