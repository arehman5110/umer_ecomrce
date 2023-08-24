import express  from "express";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"



//configure env
dotenv.config();


//database config
connectDB();


// rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"))



//routes 
app.use("/api/vi/auth", authRoutes)
//rest api
app.get('/', (req , res ) => {
    res.send({
        message:"Welcome to ecomrece app",
    });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log(`App is runnnig on ${PORT}`);
})
