// models/User.js
import mongoose from'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image:{
    type: Buffer,
    required: false,
  }
});

const Product = mongoose.model('Product', userSchema);

export default Product  
