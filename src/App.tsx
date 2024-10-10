import { useState } from 'react';
import AddTaskModal from './AddTaskModal';
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
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [renderedSection, setRenderedSection] = useState<'All' | 'Open' | 'Closed' | 'Archived'>('All');

  function renderAllTasks() {
    return (
      <div className='task_div'>
        {tasksArray.map(task => {
          return <TaskDiv task={task}
            checkTask={(id) => {
              setTasksArray(prev => {
                const auxArray = [...prev];
                const index = auxArray.findIndex(i => i.taskID === id);
                auxArray[index] = { ...auxArray[index], isDone: !auxArray[index].isDone, taskSituation: !auxArray[index].isDone ? 'Closed' : 'Open' };
                return auxArray;
              });
            }}
            archiveTask={(id) => {
              setTasksArray(prev => {
                const auxArray = [...prev];
                const index = auxArray.findIndex(i => i.taskID === id);
                auxArray[index] = { ...auxArray[index], taskSituation: 'Archived' };
                return auxArray;
              });
            }}
            removeTask={(id) => {
              setTasksArray(() => {
                const auxArray = tasksArray.filter(t => t.taskID !== id);
                return auxArray
              })
            }}
            onChangeNameFunction={(e) => {
              setName(e.target.value);
            }}
            onChangeDescriptionFunction={(e) => {
              setDescription(e.target.value);
            }}
            editTaskFunction={(id) => {
              setTasksArray(prev => {
                const taskName = verifyName(name);
                const auxArray = [...prev];
                const index = auxArray.findIndex(i => i.taskID === id);
                auxArray[index] = { ...auxArray[index], taskName: taskName, taskDescription: description };
                return auxArray;
              })
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
            return <TaskDiv task={task}
              checkTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], isDone: !auxArray[index].isDone, taskSituation: !auxArray[index].isDone ? 'Closed' : 'Open' };
                  return auxArray;
                });
              }}
              archiveTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], taskSituation: 'Archived' };
                  return auxArray;
                });
              }}
              removeTask={(id) => {
                setTasksArray(() => {
                  const auxArray = tasksArray.filter(t => t.taskID !== id);
                  return auxArray
                })
              }}
              onChangeNameFunction={(e) => {
                setName(e.target.value);
              }}
              onChangeDescriptionFunction={(e) => {
                setDescription(e.target.value);
              }}
              editTaskFunction={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], taskName: name, taskDescription: description };
                  return auxArray;
                })
              }} />
          }
        })}
      </div>
    )
  }

  function renderClosedTasks() {
    return (
      <div className='task_div'>
        {tasksArray.map(task => {
          if (task.taskSituation === 'Closed') {
            return <TaskDiv task={task}
              checkTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], isDone: !auxArray[index].isDone, taskSituation: !auxArray[index].isDone ? 'Closed' : 'Open' };
                  return auxArray;
                });
              }}
              archiveTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  let currentTask = auxArray[index];
                  if (currentTask.taskSituation === 'Archived') {
                    if (currentTask.isDone) {
                      currentTask = { ...currentTask, taskSituation: 'Closed' }
                    } else {
                      currentTask = { ...currentTask, taskSituation: 'Open' }
                    }
                  } else {
                    currentTask.taskSituation = 'Archived';
                  }
                  return auxArray;
                });
              }}
              removeTask={(id) => {
                setTasksArray(() => {
                  const auxArray = tasksArray.filter(t => t.taskID !== id);
                  return auxArray
                })
              }}
              onChangeNameFunction={(e) => {
                setName(e.target.value);
              }}
              onChangeDescriptionFunction={(e) => {
                setDescription(e.target.value);
              }}
              editTaskFunction={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], taskName: name, taskDescription: description };
                  return auxArray;
                })
              }} />
          }
        })}
      </div>
    )
  }

  function renderArchivedTasks() {
    return (
      <div className='task_div'>
        {tasksArray.map(task => {
          if (task.taskSituation === 'Archived') {
            return <TaskDiv task={task}
              checkTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], isDone: !auxArray[index].isDone };
                  return auxArray;
                });
              }}
              archiveTask={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  if (auxArray[index].taskSituation === 'Archived' && auxArray[index].isDone) {
                    auxArray[index] = { ...auxArray[index], taskSituation: 'Closed' }
                  } else if (auxArray[index].taskSituation === 'Archived' && !auxArray[index].isDone) {
                    auxArray[index] = { ...auxArray[index], taskSituation: 'Open' }
                  } else if (auxArray[index].taskSituation !== 'Archived') {
                    auxArray[index].taskSituation = 'Archived';
                  }
                  return auxArray;
                });
              }}
              removeTask={(id) => {
                setTasksArray(() => {
                  const auxArray = tasksArray.filter(t => t.taskID !== id);
                  return auxArray
                })
              }}
              onChangeNameFunction={(e) => {
                setName(e.target.value);
              }}
              onChangeDescriptionFunction={(e) => {
                setDescription(e.target.value);
              }}
              editTaskFunction={(id) => {
                setTasksArray(prev => {
                  const auxArray = [...prev];
                  const index = auxArray.findIndex(i => i.taskID === id);
                  auxArray[index] = { ...auxArray[index], taskName: name, taskDescription: description };
                  return auxArray;
                })
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
            setName(e.target.value);
          }}
          onChangeDescriptionFunction={(e) => {
            setDescription(e.target.value);
          }}
          addTaskFunction={() => {
            const taskName = verifyName(name);
            const newTask: Task = { taskName: taskName, taskDescription: description, isDone: false, taskID: crypto.randomUUID(), taskSituation: 'Open' };
            const auxArray = [...tasksArray, newTask];
            setTasksArray(auxArray);
            setName('');
            setIsAddModalOpen(false);
          }}
          cancelTaskAddFunction={() => setIsAddModalOpen(false)}
          inputValue={name}
        />}
      </div>

      <div id="sections_div">
        <div onClick={() => setRenderedSection('All')} className={`section ${renderedSection === 'All' ? 'active_section' : 'inactive_section'}`}>All<span className={`section ${renderedSection === 'All' ? 'active_span' : 'inactive_span'}`}>{tasksArray.length}</span></div>
        <div onClick={() => setRenderedSection('Open')} className={`section ${renderedSection === 'Open' ? 'active_section' : 'inactive_section'}`}>Open<span className={`section ${renderedSection === 'Open' ? 'active_span' : 'inactive_span'}`}>{(() => {
          const auxArray = tasksArray.filter(task => task.taskSituation === 'Open');
          return auxArray.length;
        })()}</span></div>
        <div onClick={() => setRenderedSection('Closed')} className={`section ${renderedSection === 'Closed' ? 'active_section' : 'inactive_section'}`}>Closed<span className={`section ${renderedSection === 'Closed' ? 'active_span' : 'inactive_span'}`}>{(() => {
          const auxArray = tasksArray.filter(task => task.taskSituation === 'Closed');
          return auxArray.length;
        })()}</span></div>
        <div onClick={() => setRenderedSection('Archived')} className={`section ${renderedSection === 'Archived' ? 'active_section' : 'inactive_section'}`}>Archived<span className={`section ${renderedSection === 'Archived' ? 'active_span' : 'inactive_span'}`}>{(() => {
          const auxArray = tasksArray.filter(task => task.taskSituation === 'Archived');
          return auxArray.length;
        })()}</span></div>
      </div>

      {renderedSection === 'All' && <div id='all_tasks_div'>{renderAllTasks()}</div>}
      {renderedSection === 'Open' && <div id='all_tasks_div'>{renderOpenTasks()}</div>}
      {renderedSection === 'Closed' && <div id='all_tasks_div'>{renderClosedTasks()}</div>}
      {renderedSection === 'Archived' && <div id='all_tasks_div'>{renderArchivedTasks()}</div>}
    </div>
  )
}

export default App;