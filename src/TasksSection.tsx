import React from "react";

type Props = {
    allTasks: number,
    openTasks: number,
    closedTasks: number,
    archivedTasks: number,
    sectionToRender: 'All' | 'Open' | 'Closed' | 'Archived',
    onClickSetAllSection: React.MouseEventHandler<HTMLDivElement>
    onClickSetOpenSection: React.MouseEventHandler<HTMLDivElement>
    onClickSetClosedSection: React.MouseEventHandler<HTMLDivElement>
    onClickSetArchivedSection: React.MouseEventHandler<HTMLDivElement>
}

const TaskSection = ({ allTasks, openTasks, closedTasks, archivedTasks, sectionToRender, onClickSetAllSection: setSectionAllToRender, onClickSetOpenSection: setSectionOpenToRender, onClickSetClosedSection: setSectionClosedToRender, onClickSetArchivedSection: setSectionArchivedToRender }: Props) => {
    return (
        <div className='sections_div'>
            <div onClick={setSectionAllToRender} className={sectionToRender == 'All' ? 'section_active' : 'section'}>All<span>{allTasks}</span></div>
            <div onClick={setSectionOpenToRender} className={sectionToRender == 'Open' ? 'section_active' : 'section'}>Open<span>{openTasks}</span></div>
            <div onClick={setSectionClosedToRender} className={sectionToRender == 'Closed' ? 'section_active' : 'section'}>Closed<span>{closedTasks}</span></div>
            <div onClick={setSectionArchivedToRender} className={sectionToRender == 'Archived' ? 'section_active' : 'section'}>Archived<span>{archivedTasks}</span></div>
        </div>
    )
}

export default TaskSection;