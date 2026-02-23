import todoModel from "../models/todoModel.js";

const getTodo = async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.user._id });
    res.json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { title, isChecked } = req.body;;

    const newTodo = new todoModel({
      title: req.body.title,
      isChecked: isChecked ?? false,
      user: req.user._id,
    });

    await newTodo.save();
    res.json({ success: true, data: newTodo });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todoModel.findByIdAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const checkedTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!todo) {
      return res.json({ success: false, message: "Todo not found" });
    }
    todo.isChecked = !todo.isChecked;
    await todo.save();
    return res.json({ success: true, data: todo });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { getTodo, addTodo, deleteTodo, checkedTodo };
