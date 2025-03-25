import mongoose from "mongoose";


const suppliersSchema = new mongoose.Schema({
   name:{
    type: String,
    required: true
   },

   phone: {
    type: String,
    required: true
   },

   product: {
    type: String,
    required: true
   },

   address:{
      type: String,
      required: true
   },

   email: {
      type:String,
      required: true

   }
    
}, {timestamps: true})



const Supplier = mongoose.model('Supplier', suppliersSchema);

export default Supplier