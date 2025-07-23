import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faCheck,
  faXmark,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "./ConfirmModal";

const TodoList = ({ tasks, setTasks, darkMode }) => {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const editInputRef = useRef(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleAddTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function handleDeleteTask(index) {
    // const confirmed = window.confirm("Are you sure you want to delete this task?");
    // if (!confirmed) return;
    // setTasks(tasks.filter((_, i) => i !== index));
    // if (editIndex === index) {
    //   setEditIndex(null);
    //   setEditText("");
    // }
    setSelectedIndex(index);
    setModalAction("delete");
    setModalOpen(true);
  }

  function handleTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function handleTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function handleEditTask(index) {
    setEditIndex(index);
    setEditText(tasks[index]);
  }

  function handleEditTextChange(e) {
    setEditText(e.target.value);
  }

  function handleSaveEdit() {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = editText.trim() || tasks[editIndex];
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
  }

  function handleCancelEdit() {
    setEditIndex(null);
    setEditText("");
  }

  function handleClearAll() {
    // const confirmed = window.confirm("Are you sure you want to clear all tasks?");
    // if (!confirmed) return;
    // setTasks([]);
    // localStorage.removeItem("my-tasks");
    setModalAction("clear");
    setModalOpen(true);
  }

  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  });

  function confirmAction() {
    if (modalAction === "delete" && selectedIndex !== null) {
      setTasks(tasks.filter((_, i) => i !== selectedIndex));
      if (editIndex === selectedIndex) {
        setEditIndex(null);
        setEditText("");
      }
    } else if (modalAction === "clear") {
      setTasks([]);
      localStorage.removeItem("my-tasks");
    }
    setModalOpen(false);
    setSelectedIndex(null);
    setModalAction(null);
  }

  function cancelAction() {
    setModalOpen(false);
    setSelectedIndex(null);
    setModalAction(null);
  }

  return (
    <section className={`todo-wrapper ${darkMode ? "dark-mode" : ""}`}>
      <div className="input-container">
        <input
          className="input-text"
          type="text"
          placeholder="Enter task..."
          required
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
        <button className="add-button" onClick={handleAddTask}>
          Add Task
        </button>
        <button className="clear-button" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      <main className="todo-container">
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`task-item ${editIndex === index ? "editing" : ""}`}
            >
              <span className="task-text">
                {editIndex === index ? (
                  <div className="edit-input-wrapper">
                    <textarea
                      value={editText}
                      onChange={handleEditTextChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSaveEdit();
                        }
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      className="edit-input"
                      ref={editInputRef}
                      rows={1}
                    />
                  </div>
                ) : (
                  task
                )}
              </span>

              <div
                className={
                  editIndex === index ? "edit-section" : "task-actions"
                }
              >
                {editIndex === index ? (
                  <>
                    <button
                      className="save-or-cancel-button"
                      onClick={handleSaveEdit}
                      disabled={!editText.trim()}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="save-or-cancel-button"
                      onClick={handleCancelEdit}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="move-button"
                      onClick={() => handleTaskUp(index)}
                    >
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                    <button
                      className="move-button"
                      onClick={() => handleTaskDown(index)}
                    >
                      <FontAwesomeIcon icon={faArrowDown} />
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEditTask(index)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <ConfirmModal
        isOpen={modalOpen}
        message={
          modalAction === "clear"
            ? "Are you sure you want to clear all tasks?"
            : "Are you sure you want to delete this task?"
        }
        onConfirm={confirmAction}
        onCancel={cancelAction}
      />
    </section>
  );
};

export default TodoList;
