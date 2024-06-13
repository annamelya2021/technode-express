
const Task = ({task})=>{
    return(
        <article className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Estimated hours: {task.estimatedHours}</p>
        </article>
    )
}

export default Task;