import mongoose, { Schema } from "mongoose"

const locationsScheme = new Schema({
    _id: mongoose.Types.ObjectId,
    latitude: Number,
    longitude: Number,
    text: String
});

export default mongoose.model('locations', locationsScheme);
