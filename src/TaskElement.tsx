import React from "react"

type Props = {
    task: {
        taskName: string,
        taskID: string,
        isDone: boolean,
        editing: boolean
        taskDescription: string,
        removing: boolean,
        situation: 'Open' | 'Closed' | 'Archived'
    }
    onClickRemoveButton: React.MouseEventHandler<HTMLButtonElement> //Aprendi a tipar isso no Stackoverflow
    onClickCancelRemoveButton: React.MouseEventHandler<HTMLButtonElement>
    onClickConfirmRemoveButton: React.MouseEventHandler<HTMLButtonElement>
    onClickEditButton: React.MouseEventHandler<HTMLButtonElement>;
    onChangeEditInput: React.ChangeEventHandler<HTMLInputElement>;
    onClickConfirmEditButton: React.MouseEventHandler<HTMLButtonElement>;
    onClickCheckTask: React.MouseEventHandler<HTMLDivElement>;
}
const TaskElement = ({ task, onClickRemoveButton: openRemoveModal, onClickCancelRemoveButton: cancelRemoveFunction, onClickConfirmRemoveButton: removeFunction, onClickEditButton: editFunction, onChangeEditInput: handleInputChange, onClickConfirmEditButton: confirmEditFunction, onClickCheckTask: checkTaskFunction }: Props) => {
    return (
        <div className="task_div">
            <div className="task_top_div">
                <div className="task_texts">
                    <p id="task_name" style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>{task.taskName}</p>
                    <p id="task_description">{task.taskDescription}</p>
                </div>
                <div className={task.isDone ? 'task_checkcircle_active' : 'task_checkcircle'} onClick={checkTaskFunction} >&#x2714;</div>
            </div>
            <hr />
            <div className="task_buttons">
                <button onClick={openRemoveModal}>Remove task</button>
                {task.removing && <div className="modal_backdrop">
                    <div className="modal_content remove_modal_content">
                        <div className="remove_message">
                            <p id="remove_modal_main_text">Are you sure you want to remove the task?</p>
                            <hr id="remove_modal_hr" />
                            <p id="remove_modal_sub_text">This can't be undone.</p>
                        </div>
                        <div className="remove_modal_buttons">
                            <button id="cancel_button" className="modal_buttons" onClick={cancelRemoveFunction}>Cancel</button>
                            <button id="confirm_button" className="modal_buttons" onClick={removeFunction}>Remove</button>
                        </div>
                    </div>
                </div>}
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