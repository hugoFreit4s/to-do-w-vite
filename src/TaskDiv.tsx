import { useState } from "react";
import Task from "./TaskType";

type Props = {
    task: Task;
    removeTask: () => void;
    archiveTask: () => void;
    checkTask: () => void;
    handleNameChange: (newName: string) => void;
    handleDescriptionChange: (newDescription: string) => void;
    confirmTaskEdit: () => void;
}

const TaskDiv = ({ task, checkTask, removeTask, archiveTask, handleNameChange, handleDescriptionChange, confirmTaskEdit }: Props) => {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    return (
        <div className="task_div">
            <div className="task_top_div">
                <div className="task_texts">
                    <p className="task_name_element" style={{ textDecoration: task.isDone ? 'line-through' : 'none' }}>{task.taskName}</p>
                    <p className="task_description_element">{task.taskDescription}</p>
                    <p>{task.taskSituation}</p>
                </div>
                <div className="task_checkcircle" onClick={checkTask}>&#10003;</div>
            </div>
            <div className="task_bottom_div">
                <div className="remove_task_btn" onClick={removeTask}>remove</div>
                <div className="edit_task_btn" onClick={() => setEditModalOpen(true)}>edit</div>
                <div className="archive_task_btn" onClick={archiveTask}>arc</div>
            </div>
            {editModalOpen &&
                <div className="modal_backdrop">
                    <div className="modal_content">
                        <input type="text" onChange={(e) => handleNameChange(e.target.value)} />
                        <input type="text" onChange={(e) => handleDescriptionChange(e.target.value)} />
                        <button onClick={() => {
                            confirmTaskEdit();
                            setEditModalOpen(false);
                        }}>Edit task!</button>
                    </div>
                </div>}
        </div>
    )
}

export default TaskDiv;