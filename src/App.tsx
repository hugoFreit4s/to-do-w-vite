import { useState } from 'react';
import Task from './Task';

function App() {
  const [name, setName] = useState('');
  const [database, setDatabase] = useState<string[]>([]);

  return (
    <>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button onClick={() => {
        setDatabase(prevDatabase => [...prevDatabase, name]);
        console.log(database);
      }}>add task</button>

      <div>
        {database.map((task) => (
          <Task taskName={task} />
        ))}
      </div>
    </>
  );
}

export default App;
