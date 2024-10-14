import Section from "./SingleTaskSection";
export type SectionsName = 'All' | 'Open' | 'Closed' | 'Archived';

type Props = {
    allTasksAmount: number;
    openTasksAmount: number;
    closedTasksAmount: number;
    archivedTasksAmount: number;
    selectSectionToRender: (section: SectionsName) => void;
    activeSection: SectionsName;
}

export default function TaskSections({ allTasksAmount, openTasksAmount, closedTasksAmount, archivedTasksAmount, selectSectionToRender, activeSection }: Props) {
    const sections: SectionsName[] = ['All', 'Open', 'Closed', 'Archived'];
    const sectionsAmount = {
        'All': allTasksAmount,
        'Open': openTasksAmount,
        'Closed': closedTasksAmount,
        'Archived': archivedTasksAmount,
    }

    return (
        <div className="task_sections">
            {sections.map(section => {
                return <Section
                    activeSection={activeSection}
                    selectSectionToRender={selectSectionToRender}
                    thisSection={section}
                    amount={sectionsAmount[section]} />
            })}
        </div>
    )
}