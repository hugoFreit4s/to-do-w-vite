import { EventHandler, useState } from 'react';
import TaskElement from './TaskElement';

type Task = {
  taskName: string,
  taskDescription: string,
  taskID: string,
  isTaskDone: boolean,
  editing: boolean
}

function getDayName(dateStr: string, locale: string) {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

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


function App() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isTaskDone, setIsTaskDone] = useState<boolean>(false);
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const date = new Date();
  const dateStr = `${date.getMonth() + 1}/${date.getDay() - 1}/${date.getFullYear()}`
  const dayOfTheWeek = getDayName(dateStr, 'en-us')

  return (
    <div id='app_container'>
      <div className="header">
        <div className="header_left_side">
          <h1>Today's Task</h1>
          <h2>{`${dayOfTheWeek}, ${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })}`}</h2>
        </div>
        <button className="new_task_button" onClick={() => setIsModalOpened(!isModalOpened)}>&#x2b; New Task</button>
      </div>
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
            <div className="modal_buttons_div">
              <div className="left_buttons">
                <input type="date" name="task_date" id="task_date_input" />
                <div id='assign_to_div' className='modal_buttons'>Assign To</div>
              </div>
              <div className="right_buttons">
                <button id='cancel_button' className='modal_buttons' onClick={() => setIsModalOpened(false)}>Cancel</button>
                <button id='add_task_button' className='modal_buttons' onClick={() => {
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
    </div>
  );
}

export default App;
