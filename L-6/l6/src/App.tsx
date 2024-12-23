import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/pages/Home';
import RedirectPage from './components/pages/Redirect';
import ClosePage from './components/pages/Close';
import OpenPage from './components/pages/Open';


function App() {

  return (
    
    <>
    <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/redirect" element={<RedirectPage />} />
                    <Route path="/close" element={<ClosePage />} />
                    <Route path="/open" element={<OpenPage />} />
                </Routes>
            </div>
        </Router>
      <div>

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

      </div>

      <h1>Vite + React</h1>

      <div className="card">

        <p>
          React Router Dom Exercise
        </p>

      </div>

    </>
  )
}

export default App
