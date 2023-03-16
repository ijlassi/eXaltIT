import mongoose from "mongoose";
let placeSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  requiredPassLevel: {
    type: Number,
    required: true,
  },
  requiredAgeLevel: {
    type: String,
    required: true,
  },
});
const Place = mongoose.model("place", placeSchema);
export default Place;
