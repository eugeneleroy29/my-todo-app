import React, { useState, useEffect } from 'react';
import Footer from "./Footer"
import Header from "./Header"
import TodoList from "./TodoList"

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("my-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  })

  return (
    <>
    <Header 
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(d => !d)}
    />
    <TodoList tasks={tasks} setTasks={setTasks} />
    <Footer taskCount={tasks.length} />
    </>
  )
}

export default App
