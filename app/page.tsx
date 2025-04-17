'use client'
import React,{useEffect, useState} from "react";

interface Task {
  task: string;
  completed: boolean;
}

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
  const onSubmit = () => {
    if (task.trim() !== "") {
      const newTask: Task = { task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  };
  return (
    <div>
      <input 
      type="text" 
      placeholder="Enter Task"
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      />
      <button 
       className="mt-4 p-4"
       onClick={onSubmit}
      >
        Add Task
      </button>

      {/* Render */}

      <div>
        <ul>
          {tasks.map((t, index) => (
            <li key={index}>
              <div>{t.task}</div> 
              <div>{t.completed ? "(Completed)" : "Not Completed"}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

