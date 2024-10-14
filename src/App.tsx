import { useEffect, useState } from "react";
import Task from "./TaskType";
import TaskDiv from "./TaskDiv";
import TaskSections, { SectionsName } from "./TaskSections";

function App() {
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const [filteredTasksArr, setFilteredTasksArr] = useState<Task[]>([]);
  const [inputNewTaskName, setInputNewTaskName] = useState<string>('');
  const [inputNewTaskDescription, setInputNewTaskDescription] = useState<string>('');
  const [renderedSection, setRenderedSection] = useState<SectionsName>('All');

  useEffect(() => {
    if (renderedSection === 'All') {
      setFilteredTasksArr([...tasksArr]);
    } else {
      setFilteredTasksArr(tasksArr.filter(task => task.situation === renderedSection));
    }
  }, [tasksArr, renderedSection]);

  function verifyTaskName(newName: string): string {
    if (newName.length <= 3) {
      return 'Title must have more than 3 chars';
    } else {
      return newName;
    }
  }

  function verifyTaskDescription(newDescription: string): string {
    if (newDescription.length <= 5) {
      return 'Description must have more than 5 chars';
    } else {
      return newDescription;
    }
  }

  return (
    <div className="main">
      <div className="top_div">
        <input type="text" name="task_name" id="task_name" onChange={(e) => {
          setInputNewTaskName(e.target.value);
        }} />
        <input type="text" name="task_description" id="task_description" onChange={(e) => {
          setInputNewTaskDescription(e.target.value);
        }} />
        <button onClick={() => {
          const newName = verifyTaskName(inputNewTaskName);
          const newDescription = verifyTaskDescription(inputNewTaskDescription);
          const newTask: Task = { name: newName, description: newDescription, ID: crypto.randomUUID(), isDone: false, situation: 'Open' }
          setTasksArr(prev => {
            const auxArr = [...prev, newTask];
            return auxArr;
          })
        }}>Add text</button>

      </div>
      <TaskSections
        allTasksAmount={tasksArr.length}
        archivedTasksAmount={tasksArr.filter(t => t.situation === 'Archived').length}
        closedTasksAmount={tasksArr.filter(t => t.situation === 'Closed').length}
        openTasksAmount={tasksArr.filter(t => t.situation === 'Open').length}
        selectSectionToRender={(section) => {
          setRenderedSection(section);
        }}
        activeSection={renderedSection} />

      <div className="tasks_div">
        {filteredTasksArr.map(task => {
          return <TaskDiv
            key={task.ID}
            task={task}
            checkTask={() => {
              setTasksArr(prev => {
                const auxArr = [...prev];
                const index = auxArr.findIndex(i => i.ID === task.ID);
                auxArr[index] = { ...auxArr[index], isDone: !auxArr[index].isDone }
                return auxArr;
              })
            }}
            removeTask={() => {
              setTasksArr(prev => {
                const auxArr = [...prev];
                return auxArr.filter(t => t.ID !== task.ID);
              })
            }}
            archiveTask={() => {
              setTasksArr(prev => {
                let newSituation: 'Open' | 'Closed' | 'Archived';
                if (task.situation !== 'Archived') {
                  newSituation = 'Archived';
                } else if (task.isDone === false) {
                  newSituation = 'Open';
                } else {
                  newSituation = 'Closed';
                }
                let auxArr: Task[] = [...prev];
                const index = auxArr.findIndex(i => i.ID === task.ID);
                auxArr[index] = { ...auxArr[index], situation: newSituation };
                return auxArr;
              })
            }}
            handleNameChange={(newName) => {
              setInputNewTaskName(newName)
            }}
            handleDescriptionChange={(newDescription) => {
              setInputNewTaskDescription(newDescription);
            }}
            confirmTaskEdit={() => {
              setTasksArr(prev => {
                const newName = verifyTaskName(inputNewTaskName);
                const newDescription = verifyTaskDescription(inputNewTaskDescription);
                const auxArr = [...prev];
                const index = auxArr.findIndex(i => i.ID === task.ID);
                auxArr[index] = { ...auxArr[index], name: newName, description: newDescription }
                setInputNewTaskName('');
                setInputNewTaskDescription('');
                return auxArr;
              })
            }} />
        })}
      </div>
    </div>
  )
}

export default App;