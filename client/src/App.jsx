import { useState } from 'react'
import './App.css'

import UserContext from './context/userContext';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { createBrowserRouter } from 'react-router-dom';

function App() {
  const [user, setUser] = useState()



  return (
    <>

      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>

    </>
  )
}

export default App
