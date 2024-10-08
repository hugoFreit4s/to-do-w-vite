type Props = {
    task: {
        taskName: string,
        taskID: string,
        isDone: boolean,
        editing: boolean
        taskDescription: string
    }
    onClickRemoveButton: React.MouseEventHandler<HTMLButtonElement> //Aprendi a tipar isso no Stackoverflow
    onClickEditButton: React.MouseEventHandler<HTMLButtonElement>;
    onChangeEditInput: React.ChangeEventHandler<HTMLInputElement>;
    onClickConfirmEditButton: React.MouseEventHandler<HTMLButtonElement>;
    onClickCheckTask: React.MouseEventHandler<HTMLDivElement>;
}
const TaskElement = ({ task, onClickRemoveButton: removeFunction, onClickEditButton: editFunction, onChangeEditInput: handleInputChange, onClickConfirmEditButton: confirmEditFunction, onClickCheckTask: checkTask }: Props) => {
    return (
        <div className="task_div">
            <div className="task_top_div">
                <div className="task_texts">
                    <p id="task_name">{task.taskName}</p>
                    <p id="task_description">{task.taskDescription}</p>
                </div>
                <div className="task_checkcircle" onClick={checkTask}>&#x2714;</div>
            </div>
            <hr />
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