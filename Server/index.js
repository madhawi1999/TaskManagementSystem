import express from "express";
import cors from "cors"
import { UserRouter } from "./Routes/UserRoute.js";

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', UserRouter)

app.listen(3000, () =>
{
    console.log("Server is running")
} )