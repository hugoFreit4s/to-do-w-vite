import React, { useState } from "react"

type Props = {
    task: {
        taskName: string,
        taskID: string,
        isDone: boolean,
        taskDescription: string,
        situation: 'Open' | 'Closed' | 'Archived'
    }
    onClickConfirmRemoveButton: React.MouseEventHandler<HTMLButtonElement>;
    onClickCheckTask: React.MouseEventHandler<HTMLDivElement>;
}
const TaskElement = ({ task, onClickConfirmRemoveButton: removeFunction, onClickCheckTask: checkTaskFunction }: Props) => {
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    function verifyName(taskName: string): string {
        if (taskName.length < 4) {
            return 'No title';
        } else {
            return taskName;
        }
    }

    function verifyDescription(taskDescription: string): string {
        if (taskDescription.length < 10) {
            return 'No description';
        } else {
            return taskDescription;
        }
    }

    return (
        <div className={`task_div ${task.situation.toLowerCase()}`}>
            <div className="task_top_div">
                <div className="task_texts">
                    <p id="task_name" style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>{task.taskName}</p>
                    <p id="task_description">{task.taskDescription}</p>
                </div>
                <div className={task.isDone ? 'task_checkcircle_active' : 'task_checkcircle'} onClick={checkTaskFunction} >&#x2714;</div>
            </div>
            <hr />
            <div className="task_buttons">
                <button onClick={() => setIsRemoveModalOpen(true)}>Remove task</button>
                {isRemoveModalOpen && <div className="modal_backdrop">
                    <div className="modal_content remove_modal_content">
                        <div className="remove_message">
                            <p id="remove_modal_main_text">Are you sure you want to remove the task?</p>
                            <hr id="remove_modal_hr" />
                            <p id="remove_modal_sub_text">This can't be undone.</p>
                        </div>
                        <div className="remove_modal_buttons">
                            <button id="cancel_button" className="modal_buttons" onClick={() => setIsRemoveModalOpen(false)}>Cancel</button>
                            <button id="confirm_button" className="modal_buttons" onClick={(e) => {
                                removeFunction(e);
                                setIsRemoveModalOpen(false);
                            } //Essa função executava apenas o setIsRemoveModalOpen(false), mas passando o evento ela voltou a funcionar normalmente, por que?
                            }>Remove</button>
                        </div>
                    </div>
                </div>}
                <button onClick={() => setIsEditModalOpen(true)}>Edit task</button>
            </div>
            {isEditModalOpen && <div className="edit_task_div">
                <input type="text" onChange={e => {
                    const newTaskName = verifyName(e.target.value);
                    setName(newTaskName)
                }} />
                <button onClick={() => {
                    task.taskName = name
                    setIsEditModalOpen(false);
                }}>Edit!</button>
            </div>}
        </div>
    )
}

export default TaskElement;