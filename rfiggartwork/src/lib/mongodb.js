import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  await client.connect();
  const db = client.db(); // Use the default database defined in the URI

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
