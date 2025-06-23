import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ tasks, setTasks }) => {

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function handleInputChange (event) {
    setNewTask(event.target.value);
  }

  function handleAddTask () {
    if (newTask.trim() !== "") {
      setTasks(t => [...t, newTask]);
      setNewTask("");
    }
  }

  function handleDeleteTask (index) {
    setTasks(tasks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  }

  function handleTaskUp (index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index-1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function handleTaskDOwn (index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function handleEditTask (index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function handleEditTextChange (e) {
    setEditText(e.target.value);
  }

  function handleSaveEdit () {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editText.trim() || tasks[editIndex];
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  }

  function handleCancelEdit () {
    setEditIndex(null);
    setEditText("");
  }

  return (
    <section className="todo-wrapper">
      <div className="input-container">
        <input 
            text="text"
            placeholder="Enter task..."
            required
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="add-button" onClick={handleAddTask}>Add Task</button>
      </div> 
      <main className="todo-container">
          <ul>
              {tasks.map((task, index) => 
                <li key={index} className="task-item">
                    <span className="task-text">{task}</span>
                    <div className="task-actions">
                      <button className="delete-button" onClick={() => handleDeleteTask(index)}>Delete</button>
                      <button className="move-button" onClick={() => handleTaskUp(index)}><FontAwesomeIcon icon={faArrowUp} /></button>
                      <button className="move-button" onClick={() => handleTaskDOwn(index)}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                </li>
              )}
          </ul>
      </main>
    </section>
  )
}

export default TodoList