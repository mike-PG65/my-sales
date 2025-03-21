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
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product  
