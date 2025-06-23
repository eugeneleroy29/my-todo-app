import React, { useState, useEffect } from 'react';
import Footer from "./Footer"
import Header from "./Header"
import TodoList from "./TodoList"

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("my-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  });

  return (
    <>
    <Header />
    <TodoList tasks={tasks} setTasks={setTasks} />
    <Footer taskCount={tasks.length} />
    </>
  )
}

export default App
