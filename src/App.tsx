import { useState } from 'react';
import Task from './Task';

function App() {
  const [name, setName] = useState('');
  const [database, setDatabase] = useState<{ tName: string, id: string, isEditing: boolean }[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function verifyName(newName: string) {
    if (newName === '') {
      return 'No title';
    } else {
      return newName;
    }
  }

  function removeTask(tId: string) {
    const tempArr: { tName: string, id: string, isEditing: boolean }[] = [];
    database.forEach(x => {
      if (x.id !== tId) tempArr.push(x);
    });
    setDatabase([...tempArr]);
  }

  function editTask(tId: string) {
    const newTName = verifyName(name);
    const newDb = database.map(task => {
      if (task.id === tId) {
        task.tName = newTName;
        task.isEditing = false;
        setIsEditing(false);
      };
      return task
    });
    setName('');
    setDatabase([...newDb]);
  }

  return (
    <>
      <input id='inp_name' type="text" onChange={e => {
        if (e.target.value.length >= 4) {
          setName(e.target.value);
        } else {
          setName('No title');
        }
      }} />
      <button onClick={() => {
        const newTaskName = verifyName(name);
        setDatabase(prev => [...prev, { tName: newTaskName, id: crypto.randomUUID(), isEditing: false }]);
        const inp = document.getElementById('inp_name') as HTMLInputElement;
        inp.value = '';
        setName('');
      }}>add task</button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {database.map((task) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100px', gap: '5px' }}>
              <Task taskName={task.tName} />
              <button onClick={() => removeTask(task.id)}>Del task</button>
              <button onClick={() => {
                task.isEditing = !task.isEditing
                setIsEditing(!isEditing)
              }}>Edit task</button>
              {task.isEditing && <div style={{ display: 'flex', gap: '5px' }}><input onChange={e => setName(e.target.value)}></input><button onClick={() => editTask(task.id)}>Edit</button></div>}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
