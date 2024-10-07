type Props = {
    taskName: string;
}
const Task = ({ taskName }: Props) => {
    return (
        <p style={{ backgroundColor: 'gray', width: 'fit-content' }}>{taskName}</p>
    )
}

export default Task;