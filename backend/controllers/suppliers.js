import Supplier from '../models/Suppliers.js'


export const addSupplier = async (req, res)=>{
    const {name, phone, product, address, email} = req.body


    try {

        const existingSupplier = await Supplier.findOne({email})

        if (existingSupplier){
            return res.status(403).json({message: "Supplier already exists"});
        }


        const supplier = await Supplier.create(req.body)
        console.log(`${name} wants to be created`)
        await supplier.save()

        return res.status(200).json({message: "Supplier added successfully!"})
        
    } catch (error) {

        console.error("Unable to add the Supplier!!!", error)
        return res.status(500).json({message: "Unable to add the Supplier!!!"}, error)
        
    }
}



export const supplierList = async (req, res)=>{
    try {
        const suppliers = await Supplier.find()
        return res.status(200).json(suppliers)
        
    } catch (error) {

        return res.status(500).json({message: "Unable to find the Suppliers!!!"})
        
    }
}


export const supplier = async (req, res)=>{
    const {id} = req.params

    try {

        const supplier = await Supplier.findById(id) 

        if (!supplier) {
            return res.status(404).json({ message: "Supplier not found" });
        }
        return res.status(200).json(supplier)
        
    } catch (error) {
        return res.status(500).json({message: "Unable to find the user!!"})
        
    }
}