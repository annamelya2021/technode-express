import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function App() {
  const [count, setCount] = useState(0)

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

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
