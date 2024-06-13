import {createBrowserRouter,redirect} from "react-router-dom";
// import { getProjects,getProject } from "./utils/fetch";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/register/Register";
// import ProjectsList from "./pages/project/ProjectsList";
// import Project from "./pages/project/Project";

// async function fetchProjects(){
//     const result = await getProjects();
//     if(result.error){
//         return redirect("/register");
//     }
//     return result.data;
// }
// async function fetchProject(id){
//     const result = await getProject(id);
//     if(result.error){
//         return redirect("/register");
//     }
//     return result.data;
// }

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <h2>Hola Mundo</h2>
        },
        
        // {
        //     path: "/projects",
        //     element: <ProjectsList />,
        //     loader: () => fetchProjects()
        // },
        // {
        //     path: "/projects/:id",
        //     element: <Project />,
        //     loader: ({params}) => fetchProject(params.id)
        // },
      ]
    },
    {
        path: "/register",
        element: <Register />
    }
    
  ]);

export default router;