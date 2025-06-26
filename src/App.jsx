import React, { useState, useEffect } from 'react';
import Footer from "./Footer"
import Header from "./Header"
import TodoList from "./TodoList"

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("my-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("my-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("dark-mode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div id="root" className={darkMode ? "dark-mode" : ""}>
    <Header 
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
    <TodoList tasks={tasks} setTasks={setTasks} darkMode={darkMode} />
    <Footer taskCount={tasks.length} />
    </div>
  )
}

export default App
