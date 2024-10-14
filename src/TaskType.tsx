type Task = {
    name: string,
    description: string,
    ID: string,
    isDone: boolean,
    situation: 'Open' | 'Closed' | 'Archived';
}

export default Task;