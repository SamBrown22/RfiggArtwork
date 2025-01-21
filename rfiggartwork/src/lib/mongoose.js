import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToDatabase;
