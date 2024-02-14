import mongoose, { Schema } from "mongoose"

export interface LocationObj {
    _id: mongoose.Types.ObjectId,
    latitude: Number,
    longitude: Number,
    info: String
}

export default mongoose.model('locations', new Schema<LocationObj>({
    _id: mongoose.Types.ObjectId,
    latitude: Number,
    longitude: Number,
    info: String
}))
