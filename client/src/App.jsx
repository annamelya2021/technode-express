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
      <div>
        <Navbar onViewChange={handleViewChange} />
     
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer />
    </>
  )
}

export default App
