import Product from "../models/products.js";


export const createProduct = async (req, res)=>{

    const { name, quantity, category } = req.body;
    
    // Validate required fields
    if (!name || !quantity || !category) {
      return res.status(400).json({ message: 'Name, quantity, and category are required' });
    }


    try {

        const newProduct = new Product({
            name,
            quantity,
            category,
            
        });

        await newProduct.save()

        return res.status(200).json({message:"Product added sucessfully"})
        
    } catch (error) {
        console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error });
        
    }
}
