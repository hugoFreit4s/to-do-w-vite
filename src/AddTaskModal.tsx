import React from "react";

type Props = {
    onChangeNameFunction: React.ChangeEventHandler<HTMLInputElement>;
    onChangeDescriptionFunction: React.ChangeEventHandler<HTMLInputElement>;
    addTaskFunction: React.MouseEventHandler<HTMLDivElement>;
    cancelTaskAddFunction: React.MouseEventHandler<HTMLDivElement>;
    inputValue: string;
}

const AddTaskModal = ({ onChangeNameFunction: handleNameChange, onChangeDescriptionFunction: handleDescriptionChange, addTaskFunction: handleTaskAdd, cancelTaskAddFunction: handleTaskAddCancel, inputValue }: Props) => {
    return (
        <div className="modal_backdrop" id="add_task_modal_backdrop">
            <div className="modal_content" id="add_task_modal_content">
                <div id="add_modal_inputs">
                    <input type="text" placeholder="Task name here..." value={inputValue} onChange={handleNameChange} />
                    <input type="text" id="task_description_input" placeholder="Task description" onChange={handleDescriptionChange} />
                </div>
                <div id="add_modal_buttons">
                    <div>
                        <input type="date" name="" id="" />
                    </div>
                    <div style={{ display: "flex", gap: "30px" }}>
                        <div className="modal_button add_task_modal_button" id="cancel_task_add_button" onClick={handleTaskAddCancel}>Cancel</div>
                        <div className="modal_button add_task_modal_button" id="confirm_add_task_button" onClick={handleTaskAdd}>Add Task</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTaskModal;