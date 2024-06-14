import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import UserContext from './context/userContext';

function App() {
  const [user, setUser] = useState()

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <>
    {/* <h1>Technode-Express</h1> */}
    <Navbar onViewChange={handleViewChange} />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
      <Footer />
    </>
  )
}

export default App
