"use client";
import React, { useState, useEffect } from "react";
import './todo.css'

type Todolist = {
        id:number,
        text:string,
    }

const Todo = () => {
  // taskย่อย
  const [task, setTask] = useState<string>("");

  // task all, arrow function to get task from local storage
  const [tasksArray, setTasksArray] = useState<Array<Todolist>>(() => {
    const saveTasks = localStorage.getItem("tasksArray");
    console.log(`saveTask : ${saveTasks}`);
    if (saveTasks) {
      return JSON.parse(saveTasks);
    } else {
      return [];
    }
  });

  // editing...
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // task currently
  const [currentTask, setCurrentTask] = useState<Todolist>({id:0,text:""});
  //Done
  const [done, setDone] = useState<boolean>(false);
  //Done id
  const [doneId, setDoneId] = useState<number>()

  //   console.log(`Task : ${tasksArray}`);

  // console.log(task)
  //   console.log(`Task Array : ${tasksArray}`);

  // read value and set state
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`e.target.value : ${event.target.value}`);
    setTask(event.target.value);
    console.log(`Task : ${task}`);
  }

  // ADD value to TasksArray
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    // console.log(`e.target.value : ${e}`);
    event.preventDefault();

    if (task !== "") {
      const newObj = { id: Math.random(), text: task };
      setTasksArray([...tasksArray, newObj]);
      setTask("");
    }
  }

  // Save Value to local Storage
  useEffect(() => {
    // JS object to string
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
    //state
  }, [tasksArray]);

  // Delete
  function handleDeleteClick(id: number) {
    const removeItem = tasksArray.filter((task) => {
      return task.id !== id;
    });
    setTasksArray(removeItem);
  }

  function handleEditClick(task: Todolist) {
    setIsEditing(true);
    setCurrentTask({ ...task });
  }

  function handleEditInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const taskEdit = event.target.value;
    console.log(`Taskใหม่ : ${taskEdit}`);
    setCurrentTask({
      id: currentTask.id,
      text: taskEdit,
    });
  }

    function handleEditFormSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const updatedItem = tasksArray.map((task) => {
        console.log(task)
        console.log(currentTask)
        if (task.id === currentTask.id) {
          return currentTask;
        } else {
          return task;
        }
      });

      setTasksArray(updatedItem);
      setIsEditing(false);

    }

    function handleDone(id:number) {
      setDone(true);
      setDoneId(id);
    }

  return (
    <main>
      <div className="content">
        <h2>My Todos</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="input-text"
            value={task}
            onChange={handleInputChange}
            placeholder="Create a task ..."
          />
          <button type="submit" className="button-save">
            Save
          </button>
        </form>
        <div>
          <ul>
            {tasksArray.map((task) => (
              <div>
                <hr className="line" />
                <li key={task.id}>
                  {isEditing && currentTask.id === task.id ? (
                    <div className="ul-li-div">
                      <input type="checkbox" className="check-box" disabled />
                      <form onSubmit={handleEditFormSubmit}>
                        <input
                          type="text"
                          className="edit-text"
                          placeholder="Edit Task"
                          value={currentTask.text}
                          onChange={handleEditInputChange}
                        />
                        <button className="button-update" type="submit">
                          Update
                        </button>
                        <button
                          className="button-cancel"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </button>
                      </form>
                      <button
                        className="button-remove-disabled"
                        onClick={() => handleDeleteClick(task.id)}
                        disabled
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="ul-li-div">
                      <input
                        type="checkbox"
                        className="check-box"
                        onClick={()=>handleDone(task.id)}
                      />
                      {done && doneId === task.id ? (
                        <small className="small-text-done">{task.text}</small>
                      ) : (
                        <small
                          className="small-text"
                          onClick={() => handleEditClick(task)}
                        >
                          {task.text}
                        </small>
                      )}
                      <button
                        className="button-remove "
                        onClick={() => handleDeleteClick(task.id)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Todo;
