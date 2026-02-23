import express from "express";
import {
  getTodo,
  addTodo,
  deleteTodo,
  checkedTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middlewares/auth.js";

const todoRouter = express.Router();
todoRouter.use(authMiddleware);

//Routes
todoRouter.get("/", getTodo);
todoRouter.post("/", addTodo);
todoRouter.delete("/:id", deleteTodo);
todoRouter.patch("/:id", checkedTodo);

export default todoRouter;
