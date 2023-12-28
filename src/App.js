import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import User from './components/users/User'
import Home from './components/pages/Home'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import GithubState from './context/github/GithubState'
import AlertState from './context/alert/AlertState'

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/users/:login' element={<User />} />
                <Route element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App
