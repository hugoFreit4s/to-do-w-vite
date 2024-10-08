import { useState } from 'react';
import TaskElement from './TaskElement';
import TaskSection from './TasksSection';

type Task = {
  taskName: string,
  taskDescription: string,
  taskID: string,
  isDone: boolean,
  editing: boolean,
  removing: boolean,
  situation: 'Open' | 'Closed' | 'Archived';
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
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [openTasks, setOpenTasks] = useState<number>(0);
  const [closedTasks, setClosedTasks] = useState<number>(0);
  const [archivedTasks, setArchivedTasks] = useState<number>(0);
  const [allTasks, setAllTasks] = useState<number>(0);
  const [sectionToRender, setSectionToRender] = useState<'All' | 'Open' | 'Closed' | 'Archived'>('All');

  const date = new Date();
  const dateStr = `${date.getMonth() + 1}/${date.getDay() - 1}/${date.getFullYear()}`
  const dayOfTheWeek = getDayName(dateStr, 'en-us');

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
                <button id='confirm_button' className='modal_buttons' onClick={() => {
                  const taskName = verifyName(name);
                  const taskDescription = verifyDescription(description);
                  setTasksArray(prev => [...prev, { taskName: taskName, taskDescription: taskDescription, taskID: crypto.randomUUID(), isDone: false, editing: false, removing: false, situation: 'Open' }]);
                  setAllTasks(tasksArray.length + 1);
                  setName('');
                  setDescription('');
                  setIsModalOpened(false);
                }}>Add Task</button>
              </div>
            </div>
          </div>
        </div>}
      <div className="main">
        {<TaskSection allTasks={allTasks} openTasks={openTasks} closedTasks={closedTasks} archivedTasks={archivedTasks} sectionToRender={sectionToRender} onClickSetAllSection={() => { setSectionToRender('All') }} onClickSetOpenSection={() => { setSectionToRender('Open') }} onClickSetClosedSection={() => { setSectionToRender('Closed') }} onClickSetArchivedSection={() => { setSectionToRender('Archived') }} />}
        <div className="tasks_div">
          {sectionToRender === 'All' && tasksArray.map(task => {
            return (
              <TaskElement task={task}
                onClickRemoveButton={() => {
                  task.removing = true;
                  setIsRemoving(true);
                }}
                onClickCancelRemoveButton={() => {
                  task.removing = false;
                  setIsRemoving(false);
                }}
                onClickConfirmRemoveButton={() => {
                  const temporaryArray = tasksArray.filter(taskToKeep => {
                    if (taskToKeep.taskID !== task.taskID) return taskToKeep;
                  });
                  setTasksArray([...temporaryArray]);
                  setAllTasks(tasksArray.length - 1);
                  setIsRemoving(false);
                  task.removing = false;
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
                  setIsChecked(false);
                  tasksArray[taskIndex].taskName = taskName;
                  task.editing = false;
                  setIsEditing(false);
                  setName('');
                }}
                onClickCheckTask={() => {
                  let closedTasks = 0;
                  task.isDone = !task.isDone;
                  task.situation = task.isDone ? 'Closed' : 'Open';
                  tasksArray.map(t => {
                    if (t.situation === 'Closed') closedTasks++;
                  });
                  setClosedTasks(closedTasks);
                  setIsChecked(!isChecked);
                }} />
            )
          })}
          {sectionToRender === 'Closed' && tasksArray.map(task => {
            if (task.situation === 'Closed') {
              return (
                <TaskElement task={task}
                  onClickRemoveButton={() => {
                    task.removing = true;
                    setIsRemoving(true);
                  }}
                  onClickCancelRemoveButton={() => {
                    task.removing = false;
                    setIsRemoving(false);
                  }}
                  onClickConfirmRemoveButton={() => {
                    const temporaryArray = tasksArray.filter(taskToKeep => {
                      if (taskToKeep.taskID !== task.taskID) return taskToKeep;
                    });
                    setTasksArray([...temporaryArray]);
                    setIsRemoving(false);
                    task.removing = false;
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
                  }}
                  onClickCheckTask={() => {
                    let closedTasks = 0;
                    task.isDone = !task.isDone;
                    task.situation = task.isDone ? 'Closed' : 'Open';
                    tasksArray.map(t => {
                      if (t.situation === 'Closed') closedTasks++;
                    });
                    setClosedTasks(closedTasks);
                    setIsChecked(!isChecked);
                  }} />
              )
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
