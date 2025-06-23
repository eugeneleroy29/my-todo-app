import React, { useState } from 'react';
import Footer from "./Footer"
import Header from "./Header"
import TodoList from "./TodoList"

function App() {

  const [tasks, setTasks] = useState(["eat", "sleep", "walk"]);

  return (
    <>
    <Header />
    <TodoList tasks={tasks} setTasks={setTasks} />
    <Footer taskCount={tasks.length} />
    </>
  )
}

export default App
