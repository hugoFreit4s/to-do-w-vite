import { SectionsName } from "./TaskSections";

type SectionProps = {
    activeSection: SectionsName;
    selectSectionToRender: (section: SectionsName) => void;
    amount: number;
    thisSection: SectionsName;
}

export default function Section({ thisSection, activeSection, selectSectionToRender, amount }: SectionProps) {
    return (
        <div className={`task_section ${thisSection === activeSection ? 'active' : 'section'}`} onClick={() => {
            selectSectionToRender(thisSection);
        }}>{thisSection}<span className={`span ${thisSection === activeSection ? 'active' : 'section'}`}>{amount}</span>
        </div>
    )
}