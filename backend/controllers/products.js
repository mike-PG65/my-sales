import Product from "../models/Products.js";


export const createProduct = async (req, res)=>{

    const { name, quantity, categoryId } = req.body;
    
    // Validate required fields
    if (!name || !quantity || !categoryId) {
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



export const getproducts = async(req, res)=>{
    try {

    const products = await Product.find()
    res.status(200).json(products);
        
    } catch (error) {

        console.error
        res.status(500).json({message:error.message})
        
    }

}