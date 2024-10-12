import { useEffect, useState } from "react";
import Task from "./TaskType";

function App() {
  function verifyTaskName(newName: string): string {
    if (newName.length <= 3) {
      return 'No title';
    } else {
      return newName;
    }
  }

  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const [filteredTasksArr, setFilteredTasksArr] = useState<Task[]>([]);
  const [inputNewTask, setInputNewTask] = useState<string>('');
  const [renderedSection, setRenderedSection] = useState<'All' | 'Open' | 'Closed' | 'Archived'>('All');
  useEffect(() => {
    if (renderedSection === 'All') {
      setFilteredTasksArr([...tasksArr]);
    } else {
      setFilteredTasksArr(tasksArr.filter(task => task.taskSituation === renderedSection));
    }
  }, [tasksArr, renderedSection]);

  return (
    <div className="main">
      <div className="top_div">
        <input type="text" name="task_name" id="task_name" onChange={(e) => {
          setInputNewTask(e.target.value);
        }} />
        <button onClick={() => {
          const newName = verifyTaskName(inputNewTask);
          const newTask: Task = { taskName: newName, taskDescription: 'description', taskID: crypto.randomUUID(), isDone: false, taskSituation: 'Open' }
          setTasksArr(prev => {
            const auxArr = [...prev, newTask];
            return auxArr;
          })
        }}>Add text</button>
      </div>
      <div className="tasks_div">
        {filteredTasksArr.map(task => {
          return <p>{task.taskName}</p>
        })}
      </div>
    </div>
  )
}

export default App;