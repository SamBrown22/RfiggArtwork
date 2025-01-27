import { NextResponse } from 'next/server';
import  Product from '../../../models/Product'; // Correct path to the Product model
import { Product as ProductType } from '../../../types/Product'; // Correct path to the Product type
import connectToDatabase from '../../../lib/mongoose'; // Correct path to the mongoose connection file

// GET request handler to fetch all products
export async function GET() {
  try {
    await connectToDatabase(); // Ensure we are connected to the database

    // Fetch all products from the "products" collection
    const products = await Product.find(); 

    // Handle case where no products are found
    if (!products || products.length === 0) {
      return NextResponse.json({ message: 'No products found' }, { status: 404 });
    }

    // Return the fetched products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Parse the incoming JSON body
    const body = await request.json();
    console.log('Request body:', body);

    // Check that all required fields are provided
    const { title, imageUrl, description, imageSize, price } = body;

    if (!title || !imageUrl || !description || !imageSize || !imageSize.width || !imageSize.height || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new product
    const newProduct = new Product({
      title,
      imageUrl,
      description,
      imageSize,
      price,
    });

    // Save the product to the database
    await newProduct.save().catch((error: unknown) => {
      console.error('Validation or save error:', error);
      throw error;  // Re-throw the error to be caught in the try-catch block
    });

    console.log('Product created:', newProduct);

    return NextResponse.json({ message: 'Product created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
};
