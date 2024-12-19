
import mongoose from "mongoose"
require("dotenv").config()
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URL || "mongodb://0.0.0.0:2701")
   } catch (error) {
      console.log(error)
   }
}
export default connectDB