import express from "express"
import "dotenv/config"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import todoRouter from "./routes/todoRoute.js"
import connectDb from "./config/mongodb.js"

// App config
const app = express();
const port = process.env.PORT || 4000
connectDb();

// Middlewares
app.use(express.json())
app.use(cors())

// API Endpoints
app.use("/api/user", userRouter)
app.use("/api/todo", todoRouter)


app.listen(port, () => console.log("Server Started on PORT: " + port))