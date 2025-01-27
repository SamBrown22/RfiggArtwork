import mongoose from 'mongoose';

// Define the schema for products
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Field is required
    },
    imageUrl: {
      type: String,
      required: true, // Field is required
    },
    description: {
      type: String,
      required: true, // Field is required
    },
    imageSize:{
      height: {
        type: Number,
        required: true, // Field is required
      },
      width: {
        type: Number,
        required: true, // Field is required
      },
    },
  },
  { timestamps: true } // Optionally, use Mongoose's built-in timestamps for createdAt and updatedAt
);

// Create and export the Product model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
