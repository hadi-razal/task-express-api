import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://1:1@cluster0.dqqjy5s.mongodb.net/") //this must be added to env file 
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log(error)

    }
}

export default connectDB;