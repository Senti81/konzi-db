import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import useAuth from './hooks/useAuth'
import Login from './components/Login'
import Spinner from './components/Spinner'
import Navbar from './components/Navbar'

import { Home } from './pages/home/index'

import './App.css';

function App() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />
  if (!user) return <Login />

  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ paddingTop: '75x' }}>
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
