import dotenv from "dotenv"
import {connectDB} from "./db/index.js";
import {app} from './app.js'

// 1. Initialize dotenv immediately
dotenv.config(); 

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    // 2. Bind to 0.0.0.0 to ensure Render can see the service
    app.listen(port, '0.0.0.0', () => {
        console.log(`⚙️ Server is running at port : ${port}`);
    })
})
.catch((err) => {
    console.error("MONGO db connection failed !!! ", err);
    process.exit(1); // 3. Force exit so Render knows the build failed
})