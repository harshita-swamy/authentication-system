import express from "express";
import authRoute from './module/auth/auth.route.js'
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health Test:
app.use('/test', async(req, res)=>{
    res.send("API Working Fine")
})

// Routes
app.use("/api",authRoute)

export default app;