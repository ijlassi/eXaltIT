import mongoose from "mongoose";
let passSchema = new mongoose.Schema({
  level: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});
const Pass = mongoose.model("pass", passSchema);
export default Pass;
