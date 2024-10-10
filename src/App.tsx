import { useState } from 'react';
import AddTaskModal from './AddTaskModal';
import TaskSections from './TasksSections';
import Task from './TaskType';
import TaskDiv from './TaskDiv';

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


function App() {
  const date = new Date();
  const dateString = `${date.getMonth() + 1} / ${date.getDay() - 1} / ${date.getFullYear()}`;
  const dayOfTheWeek = getDayName(dateString, 'en-us');

  const [tasksArray, setTasksArray] = useState<Task[]>([]);
  const [openTasksArray, setOpenTasksArray] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [renderedSection, setRenderedSection] = useState<'All' | 'Open' | 'Closed' | 'Archived'>('All');

  function renderAllTasks() {
    return (
      <div className='task_div'>
        {tasksArray.map(task => {
          return <TaskDiv task={task} functions={{
            checkTask: () => {
              const auxArray = [...tasksArray];
              auxArray.map(taskToChange => {
                if (taskToChange === task) {
                  taskToChange.isDone = !taskToChange.isDone;
                  taskToChange.taskSituation = 'Closed';
                }
              });
              setTasksArray(auxArray);
            }
          }} />
        })}
      </div>
    )
  }

  function renderOpenTasks() {
    return (
      <div className='task_div'>
        {tasksArray.map(task => {
          if (task.taskSituation === 'Open') {
            return <TaskDiv task={task} functions={{
              checkTask: () => {
                const auxArray = [...tasksArray];
                auxArray.map(taskToChange => {
                  if (taskToChange === task) {
                    taskToChange.isDone = !taskToChange.isDone;
                    taskToChange.taskSituation = 'Closed';
                  }
                });
                setTasksArray(auxArray);
              }
            }} />
          }
        })}
      </div>
    )
  }

  return (
    <div id="main">
      <div id="head_div">
        <div id="greeting_div">
          <h1 className="title_txt">Today's Task</h1>
          <h2 className="subtitle_txt">{dayOfTheWeek}, {date.getDay()} {date.toLocaleString('en-us', { month: 'long' })}</h2>
        </div>
        <div id="add_task_button" onClick={() => setIsAddModalOpen(!isAddModalOpen)}>&#x2b; New Task</div>
        {isAddModalOpen && <AddTaskModal
          onChangeNameFunction={(e) => {
            setTaskName(e.target.value);
          }}
          onChangeDescriptionFunction={(e) => {
            setTaskDescription(e.target.value);
          }}
          addTaskFunction={() => {
            const name = verifyName(taskName);
            const newTask: Task = { taskName: name, taskDescription: taskDescription, isDone: false, taskID: crypto.randomUUID(), taskSituation: 'Open' };
            const auxArray = [...tasksArray, newTask];
            setTasksArray(auxArray);
            setTaskName('');
            setIsAddModalOpen(false);
          }}
          cancelTaskAddFunction={() => setIsAddModalOpen(false)}
          inputValue={taskName}
        />}
      </div>
      <TaskSections
        allTasksAmount={tasksArray.length}
        openTasksAmount={openTasksArray.length}
        closedTasksAmount={0}
        archivedTasksAmount={0}
        functions={
          {
            toggleAllSection: () => { setRenderedSection('All') },
            toggleOpenSection: () => { setRenderedSection('Open') },
            toggleClosedSection: () => { setRenderedSection('Closed') },
            toggleArchivedSection: () => { setRenderedSection('Archived') }
          }
        }
      />
      {renderedSection === 'All' && <div id='all_tasks_div'>{renderAllTasks()}</div>}
      {renderedSection === 'Open' && <div id='all_tasks_div'>{renderOpenTasks()}</div>}
    </div>
  )
}

export default App;