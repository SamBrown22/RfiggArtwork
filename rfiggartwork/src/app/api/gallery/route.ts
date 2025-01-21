// app/api/gallery/route.ts
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    // Connect to the MongoDB database and get the collection
    const { db } = await connectToDatabase();

    // Access the 'products' collection within the 'RfiggArtwork' database
    const galleryItems = await db.collection('products').find({}).toArray();

    // Return the gallery items in the response
    return new Response(JSON.stringify(galleryItems), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch gallery items from the database', { status: 500 });
  }
}
