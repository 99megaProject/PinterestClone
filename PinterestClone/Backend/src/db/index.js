import mongoose from "mongoose";
import { DB_NAME } from '../../constant.js'

const dbConnection = async () => {
    try {
        const data = await mongoose.connect(`${process.env.DB_URL}${DB_NAME}`)
        console.log(`Mongo db is host on ${data.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection 