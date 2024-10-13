import { useState } from "react";

type Props = {
    allTasksAmount: number;
    openTasksAmount: number;
    closedTasksAmount: number;
    archivedTasksAmount: number;
    selectSectionToRender: (section: 'All' | 'Open' | 'Closed' | 'Archived') => void;
}

const TaskSections = ({ allTasksAmount, openTasksAmount, closedTasksAmount, archivedTasksAmount, selectSectionToRender }: Props) => {
    const [selectedSection, setSelectedSection] = useState<'All' | 'Open' | 'Closed' | 'Archived'>('All');

    return (
        <div className="task_sections">
            <div className={`task_section ${selectedSection === 'All' ? 'active' : 'section'}`} onClick={() => {
                setSelectedSection('All');
                selectSectionToRender(selectedSection);
            }}>All<span className={`span ${selectedSection === 'All' ? 'active' : 'section'}`}>{allTasksAmount}</span></div>
            <div className={`task_section section ${selectedSection === 'Open' ? 'active' : 'section'}`} onClick={() => {
                setSelectedSection('Open');
                selectSectionToRender(selectedSection);
            }}>Open<span className={`span ${selectedSection === 'Open' ? 'active' : 'section'}`}>{openTasksAmount}</span></div>
            <div className={`task_section section ${selectedSection === 'Closed' ? 'active' : 'section'}`} onClick={() => {
                setSelectedSection('Closed');
                selectSectionToRender(selectedSection);
            }}>Closed<span className={`span ${selectedSection === 'Closed' ? 'active' : 'section'}`}>{closedTasksAmount}</span></div>
            <div className={`task_section section ${selectedSection === 'Archived' ? 'active' : 'section'}`} onClick={() => {
                setSelectedSection('Archived');
                selectSectionToRender(selectedSection);
            }}>Archived<span className={`span ${selectedSection === 'Archived' ? 'active' : 'section'}`}>{archivedTasksAmount}</span></div>
        </div>
    )
}

export default TaskSections;