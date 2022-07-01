import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://Matias:coderhouse@cluster0.asa9o.mongodb.net/ecommerce', {});
    console.log('Connected to MongoDB');
    
  } catch (error) {
    console.error(error);
  }
};
