import mongoose from "mongoose"
import config from "../config/mongo-db"

async function connect() {
    return await mongoose.connect(config.MONGO_URL).then(() => console.log('[connect_mongo] connected in mongodb'))
}
  
async function disconnect() {
    await mongoose.disconnect().then(() => console.log('[connect_mongo] disconnected in mongodb'))
}

export default { connect, disconnect };