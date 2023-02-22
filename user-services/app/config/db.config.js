const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to Mongoose!")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }

}
module.exports = connectDB