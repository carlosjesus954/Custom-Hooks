import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = [];
export const useTodo = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  };

  const [todos, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add todo",
      payload: todo,
    };
    dispatch(action);
  };
  const handleDeleteTodo = (id) => {
    dispatch({
      type: "Remove todo",
      payload: id,
    });
  };
  const handleToggleTodo = (id) => {
    dispatch({
      type: "Toggle todo",
      payload: id,
    });
  };
  return { 
    todos, 
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo=>!todo.done).length,
    handleNewTodo, 
    handleDeleteTodo, 
    handleToggleTodo };
};
