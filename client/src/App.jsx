import { useState } from 'react'
import './App.css'

import UserContext from './context/userContext';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState()


  return (
    <>

      <UserContext.Provider value={{ user, setUser }}>
      <ToastContainer position='top-right' autoClose={1000}/>
        <RouterProvider router={router} />
      </UserContext.Provider>

    </>
  )
}

export default App
