import { useState } from 'react';
import TaskElement from './TaskElement';

type Task = {
  taskName: string,
  taskID: string,
  isTaskDone: boolean
}

function App() {
  const [name, setName] = useState('');
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <div className='top_div'>
        <input value={name} type="text" onChange={e => setName(e.target.value)} />
        <button onClick={() => setTasksArray(prev => [...prev, { taskName: name, taskID: crypto.randomUUID(), isTaskDone: false }])}>Add task</button>
      </div>
      <div className="tasks_div">
        {tasksArray.map(task => {
          return (
            <TaskElement task={task} onClickRemoveButton={() => {
              const temporaryArray = tasksArray.filter(taskToKeep => {
                if (taskToKeep.taskID !== task.taskID) return taskToKeep;
              });
              setTasksArray([...temporaryArray]);
            }} onClickEditButton={() => { }} />
          )
        })}
      </div>
    </>
  );
}

export default App;
