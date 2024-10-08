type Props = {
    task: {
        taskName: string,
        taskID: string,
        isTaskDone: boolean,
        editing: boolean
        taskDescription: string
    }
    onClickRemoveButton: React.MouseEventHandler<HTMLButtonElement> //Aprendi a tipar isso no Stackoverflow
    onClickEditButton: React.MouseEventHandler<HTMLButtonElement>;
    onChangeEditInput: React.ChangeEventHandler<HTMLInputElement>;
    onClickConfirmEditButton: React.MouseEventHandler<HTMLButtonElement>;
}
const TaskElement = ({ task, onClickRemoveButton: removeFunction, onClickEditButton: editFunction, onChangeEditInput: handleInputChange, onClickConfirmEditButton: confirmEditFunction }: Props) => {
    return (
        <div>
            <p style={{ backgroundColor: 'gray', width: 'fit-content' }}>{task.taskName}</p>
            <p style={{ backgroundColor: 'gray', width: 'fit-content' }}>{task.taskDescription}</p>
            <div className="task_buttons">
                <button onClick={removeFunction}>Remove task</button>
                <button onClick={editFunction}>Edit task</button>
            </div>
            {task.editing && <div className="edit_task_div">
                <input type="text" onChange={handleInputChange} />
                <button onClick={confirmEditFunction}>Edit!</button>
            </div>}
        </div>
    )
}

export default TaskElement;