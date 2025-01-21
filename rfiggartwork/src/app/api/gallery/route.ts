import { NextResponse } from 'next/server';
import Product from '../../../models/Product'; // Correct path to the Product model
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

