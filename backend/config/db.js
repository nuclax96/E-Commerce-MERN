import mongoose from 'mongoose';
console.log(process.env.MONGO_URI)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://aditya94:mamVV14BDCgaeRpG@freecluster.kszumxd.mongodb.net/proshop?retryWrites=true&w=majority&appName=FreeCluster');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
