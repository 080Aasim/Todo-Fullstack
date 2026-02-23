import express from "express"
import "dotenv/config"
import cors from "cors"
import userRouter from "../backend/routes/userRoute.js"
import todoRouter from "../backend/routes/todoRoute.js"
import connectDb from "../backend/config/mongodb.js"

// App config
const app = express();
const port = process.env.PORT || 4000
connectDb();

// Middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("API Working");
});

// API Endpoints
app.use("/api/user", userRouter)
app.use("/api/todo", todoRouter)


export default app;