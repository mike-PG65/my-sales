// models/User.js
import mongoose from'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  },
  image:{
    type: Buffer,
    required: false,
  },

  price:{
    type: String,
    required: true
  }


});

const Product = mongoose.model('Product', productSchema);

export default Product  
