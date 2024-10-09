type Task = {
    taskName: string,
    taskDescription: string,
    taskID: string,
    isDone: boolean,
    taskSituation: 'Open' | 'Closed' | 'Archived';
}

export default Task;