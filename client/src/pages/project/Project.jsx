import Task from "./Task";
import "./Project.css";
import { useLoaderData } from "react-router-dom";

const Project = ()=>{
    const project = useLoaderData();
    const getOwnerName =(users,id) =>{
        const user = users.find(user => user._id === id);
        return user?.username;
    }
    const getTasksByStatus = (tasks) =>{
        const todo = tasks.filter(task => task.status ==="ToDo");
        const doing = tasks.filter(task => task.status ==="Doing");
        const done = tasks.filter(task => task.status ==="Done");
        return {todo,doing,done};
    }
    const tasksByStatus = getTasksByStatus(project.tasks);
    return (
        <article className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>Owner: {getOwnerName(project.users,project.owner)}</p>
            <p>Users:</p>
            <ul>
                {project.users.map(user => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
            <section className="tasks">
                <section className="todo">
                    <p>todo</p>
                    {tasksByStatus.todo.map(task=>(
                        <Task task={task} />
                    ))}
                </section>
                <section className="doing">
                    <p>doing</p>
                    {tasksByStatus.doing.map(task=>(
                        <Task task={task} />
                    ))}
                </section>
                <section className="done">
                    <p>done</p>
                    {tasksByStatus.done.map(task=>(
                        <Task task={task} />
                    ))}
                </section>
            </section>

        </article>
    )
}

export default Project;