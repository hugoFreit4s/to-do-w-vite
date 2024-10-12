import Task from "./TaskType";

type Props = {
    task: Task;
}

const TaskDiv = ({ task }: Props) => {
    return (
        <div className="task_div">
            <div className="task_top_div">
                <div className="task_texts">
                    <p className="task_name_element">{task.taskName}</p>
                    <p className="task_description_element">{task.taskDescription}</p>
                </div>
                <div className="task_checkcircle">&#10003;</div>
            </div>
            <div className="task_bottom_div">
                <div className="remove_task_btn">remove</div>
                <div className="edit_task_btn">edit</div>
                <div className="archive_task_btn">arc</div>
            </div>
        </div>
    )
}

export default TaskDiv;