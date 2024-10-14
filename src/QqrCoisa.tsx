import { useState } from "react";
import Task from "./TaskType";

export default function QqrCoisa() {
    const [task, setTask] = useState<Task>({} as Task);

    return (
        <>
            <input type="text" onChange={(e) => setTask(prev => {
                return { ...prev, name: e.target.value }
            })} />
            <input type="text" onChange={(e) => setTask(prev => {
                return { ...prev, description: e.target.value }
            })} />
        </>
    )
}