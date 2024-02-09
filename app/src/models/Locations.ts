import mongoose, { Schema } from "mongoose"

const locationsScheme = new Schema({
    _id: mongoose.Types.ObjectId,
    latitude: Number,
    longitude: Number,
    text: String
});

export const locations = mongoose.model('locations', locationsScheme);
