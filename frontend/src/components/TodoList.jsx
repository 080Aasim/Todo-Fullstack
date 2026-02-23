import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

function TodoList() {
  const { todo, add, remove, handleChecked } = useContext(TodoContext);
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    add({
      title: input,
      isChecked: false,
    })
    setInput("");
  };

  return (
    <div className="bg-gray-500 box-content rounded-xl">
      <div className="p-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          className="border-2 border-black mr-2 w-80 text-3xl focus:bg-white outline-none p-1 rounded text-black"
        />
        <button
          onClick={handleClick}
          className="border-2 border-black p-2 rounded text-xl font-bold cursor-pointer"
        >
          Add Task
        </button>
      </div>
      <div className="p-2">
        {todo.map((item) => (
          <div className="flex  mt-2 p-3 rounded-xl w-max border " key={item._id} >
            <div className="mr-2" key={item._id}>
              <h3
                className={`font-light text-2xl w-full box-border break-all px-2 rounded-2xl p-1 ${
                  item.isChecked ? "bg-green-500 rounded-2xl p-1" : "bg-white"
                }`}
              >
                {item.title}
              </h3>
            </div>
            <button
              onClick={() => remove(item._id)}
              className="bg-red-700 rounded-4xl w-10 cursor-pointer text-black px-2 text-2xl"
            >
              X
            </button>
            <input
              type="checkbox"
              className="w-8 ml-4"
              checked={item.isChecked}
              onChange={() => handleChecked(item._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
