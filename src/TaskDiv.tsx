import Task from "./TaskType";

type Props = {
    task: Task;
    removeTask: () => void;
    archiveTask: () => void;
    checkTask: () => void;
}

const TaskDiv = ({ task, checkTask, removeTask, archiveTask }: Props) => {
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
                <div className="edit_task_btn">edit</div>
                <div className="archive_task_btn" onClick={archiveTask}>arc</div>
            </div>
        </div>
    )
}

export default TaskDiv;