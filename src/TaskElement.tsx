type Props = {
    task: {
        taskName: string,
        taskID: string,
        isTaskDone: boolean
    }
    onClickRemoveButton: React.MouseEventHandler<HTMLButtonElement> //Aprendi a tipar isso no Stackoverflow
    onClickEditButton: React.MouseEventHandler<HTMLButtonElement>;
}
const TaskElement = ({ task, onClickRemoveButton: removeFunction, onClickEditButton }: Props) => {
    return (
        <div>
            <p style={{ backgroundColor: 'gray', width: 'fit-content' }}>{task.taskName}</p>
            <div className="task_buttons">
                <button onClick={onClickEditButton}>Edit task</button>
                <button onClick={removeFunction}>Remove task</button>
            </div>
            {true && <div className="edit_task_div">
                <input type="text" />
                <button>Edit!</button>
            </div>}
        </div>
    )
}

export default TaskElement;