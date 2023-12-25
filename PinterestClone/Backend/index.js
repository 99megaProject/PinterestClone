import { app } from "./app.js";
import dotenv from 'dotenv'
import dbConnection from './src/db/index.js'

dotenv.config()


const PORT = process.env._PORT || 8000

// calling database 
dbConnection()
    .then(() => {
        app.listen(PORT, (err) => {
            console.log(`Server run on ${PORT}`);
        })
    })
    .catch((err) => console.log(err))


