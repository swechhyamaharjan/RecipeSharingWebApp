import mongoose from "mongoose";
const mongodbURL = "mongodb://localhost:27017/RecipeSharing"

async function connectDB() {
  try {
    const conn = await mongoose.connect(mongodbURL);
    console.log(`Database connected at ${conn.connection.host}`)
  }
  catch (error) {
    console.log(`Error connecting to database ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;