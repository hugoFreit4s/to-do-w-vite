import { useState } from 'react';
import Task from './Task';

function App() {
  const [name, setName] = useState('');
  const [database, setDatabase] = useState<{ tName: string, id: string }[]>([]);

  function removeTask(tId: string) {
    const tempArr: { tName: string, id: string }[] = [];
    database.forEach(x => {
      if (x.id !== tId) tempArr.push(x);
    });
    setDatabase([...tempArr]);
  }
  return (
    <>
      <input type="text" onChange={e => {
        if (e.target.value.length >= 4) {
          setName(e.target.value);
        } else {
          setName('No title');
        }
      }} />
      <button onClick={() => {
        if (name === '') {
          setDatabase(prev => [...prev, { tName: 'No title', id: crypto.randomUUID() }]);
        } else {
          setDatabase(prev => [...prev, { tName: name, id: crypto.randomUUID() }]);
        }
        console.log(database);
      }}>add task</button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {database.map((task) => (
          <div>
            <Task taskName={task.tName} />
            <button onClick={() => removeTask(task.id)}>Del task</button>
          </div>
        ))}
      </div >
    </>
  );
}

export default App;
