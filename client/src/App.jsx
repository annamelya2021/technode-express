import { useState, useEffect } from 'react'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import UserContext from './context/userContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(()=>{
    console.log("user",user);
  },[user]);
 
  return (
    <>
    {/* <h1>Technode-Express</h1> */}
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App
