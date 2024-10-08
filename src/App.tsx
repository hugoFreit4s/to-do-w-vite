import { EventHandler, useState } from 'react';
import TaskElement from './TaskElement';

type Task = {
  taskName: string,
  taskDescription: string,
  taskID: string,
  isTaskDone: boolean,
  editing: boolean
}

function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  function verifyName(taskName: string): string {
    if (taskName.length < 4) {
      return 'No title';
    } else {
      return taskName;
    }
  }

  function verifyDescription(taskDescription: string): string {
    if (taskDescription.length < 10) {
      return 'No description';
    } else {
      return taskDescription;
    }
  }

  const date = new Date();

  return (
    <>
      <div className="header">
        <div>
          <h1>Today's Task</h1>
          <h2>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</h2>
        </div>
        <button className="new_task_button" onClick={() => setIsModalOpened(!isModalOpened)}>&#x2b; New Task</button>
        {isModalOpened &&
          <div className='modal_backdrop'>
            <div className="modal_content">
              <div className="modal_inputs">
                <input value={name} placeholder='Task name here...' id='task_name_input' type="text" onChange={e => {
                  setName(e.target.value);
                }} />
                <input value={description} placeholder='Description' id='task_description_input' type="text" onChange={e => {
                  setDescription(e.target.value);
                }} />
              </div>
              <div className="modal_buttons">
                <div className="left_buttons">
                  <input type="date" name="task_date" id="task_date_input" />
                  <div>Assign To</div>
                </div>
                <div className="right_buttons">
                  <button onClick={() => setIsModalOpened(false)}>Cancel</button>
                  <button onClick={() => {
                    const taskName = verifyName(name);
                    const taskDescription = verifyDescription(description);
                    setTasksArray(prev => [...prev, { taskName: taskName, taskDescription: taskDescription, taskID: crypto.randomUUID(), isTaskDone: false, editing: false }])
                    setName('');
                    setDescription('');
                    setIsModalOpened(false);
                  }}>Add Task</button>
                </div>
              </div>
            </div>
          </div>}
      </div>
      <div className='top_div'>
        <button onClick={() => {
          const taskName = verifyName(name);
          const taskDescription = verifyDescription(description);
          setTasksArray(prev => [...prev, { taskName: taskName, taskDescription: taskDescription, taskID: crypto.randomUUID(), isTaskDone: false, editing: false }])
          setName('');
          setDescription('');
        }}>Add task</button>
      </div>
      <div className="tasks_div">
        {tasksArray.map(task => {
          return (
            <TaskElement task={task}
              onClickRemoveButton={() => {
                const temporaryArray = tasksArray.filter(taskToKeep => {
                  if (taskToKeep.taskID !== task.taskID) return taskToKeep;
                });
                setTasksArray([...temporaryArray]);
              }}
              onClickEditButton={() => {
                task.editing = !task.editing
                setIsEditing(!isEditing);
              }}
              onChangeEditInput={(e) => {
                setName(e.target.value);
              }}
              onClickConfirmEditButton={() => {
                const taskName = verifyName(name)
                const taskIndex = tasksArray.indexOf(task);
                tasksArray[taskIndex].taskName = taskName;
                task.editing = false;
                setIsEditing(false);
                setName('');
              }} />
          )
        })}
      </div>
    </>
  );
}

export default App;
