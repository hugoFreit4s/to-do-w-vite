import React from "react"

type Props = {
    allTasksAmount: number,
    openTasksAmount: number,
    closedTasksAmount: number,
    archivedTasksAmount: number,
    functions: {
        toggleAllSection: React.MouseEventHandler<HTMLDivElement>,
        toggleOpenSection: React.MouseEventHandler<HTMLDivElement>,
        toggleClosedSection: React.MouseEventHandler<HTMLDivElement>,
        toggleArchivedSection: React.MouseEventHandler<HTMLDivElement>
    }
}

const TaskSections = ({ allTasksAmount, openTasksAmount, closedTasksAmount, archivedTasksAmount, functions }: Props) => {
    return (
        <div id="sections_div">
            <div className="section" id="all_section" onClick={functions.toggleAllSection}>All<span>{allTasksAmount}</span></div>
            <div className="section" id="open_section" onClick={functions.toggleOpenSection}>Open<span>{openTasksAmount}</span></div>
            <div className="section" id="closed_section" onClick={functions.toggleClosedSection}>Closed<span>{closedTasksAmount}</span></div>
            <div className="section" id="archived_section" onClick={functions.toggleArchivedSection}>Archived<span>{archivedTasksAmount}</span></div>
        </div>
    )
}

export default TaskSections;
