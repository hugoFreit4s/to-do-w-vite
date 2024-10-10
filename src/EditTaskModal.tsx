import React from "react";

type Props = {
    onChangeNameFunction: React.ChangeEventHandler<HTMLInputElement>;
    onChangeDescriptionFunction: React.ChangeEventHandler<HTMLInputElement>;
    editTaskFunction: React.MouseEventHandler<HTMLDivElement>;
    cancelTaskEditFunction: React.MouseEventHandler<HTMLDivElement>;
}

const EditTaskModal = ({ onChangeNameFunction: handleNameChange, onChangeDescriptionFunction: handleDescriptionChange, editTaskFunction: handleTaskEdit, cancelTaskEditFunction: handleTaskEditCancel }: Props) => {
    return (
        <div className="modal_backdrop" id="add_task_modal_backdrop">
            <div className="modal_content" id="add_task_modal_content">
                <div id="add_modal_inputs">
                    <input type="text" placeholder="Task name here..." onChange={handleNameChange} />
                    <input type="text" id="task_description_input" placeholder="Task description" onChange={handleDescriptionChange} />
                </div>
                <div id="add_modal_buttons">
                    <div>
                        <input type="date" name="" id="" />
                    </div>
                    <div style={{ display: "flex", gap: "30px" }}>
                        <div className="modal_button add_task_modal_button" id="cancel_task_add_button" onClick={handleTaskEditCancel}>Cancel</div>
                        <div className="modal_button add_task_modal_button" id="confirm_add_task_button" onClick={handleTaskEdit}>Edit Task</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTaskModal;