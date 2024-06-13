import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import CreateProject from "../../components/project/CreateProject";
const ProjectsList = () => {
    const [projects,setProjects] = useState(useLoaderData());
    const [creatingProject,setCreatingProject] = useState(false);
    const projectsHtml = projects.map(project => {
        return (
            <article className="project-list-element" key={project._id}>
                <h2>{project.name}</h2>
                <p>Users : {project.users.length}</p>
                <p>Tasks : {project.tasks.length}</p>
                <Link to={`/projects/${project._id}`}>View</Link>
            </article>
        )
    })
    return (
        <>
        {creatingProject ?
            <Modal onClose={()=>setCreatingProject(false)}>
                <CreateProject onCreate={()=>setCreatingProject(false)}/>
            </Modal>
            :
            <button onClick={()=>setCreatingProject(true)}>New Project</button>
        }
            <section className="project-list">
                {projectsHtml}
            </section>
        </>
    )
}

export default ProjectsList